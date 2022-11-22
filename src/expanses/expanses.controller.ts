import ExpanseNotFoundException from "../exceptions/ExpanseNotFoundException";
import * as express from "express";
import validationMiddleware from "../middleware/validation.middleware";
import CreateExpanseDto from "./expanses.dto";
import Expanse from "./expanses.interface";
import DbInstance from "../db/db.instance";
import Controller from "../interfaces/controller.interface";

class ExpansesController extends Controller {
  public path = "/expanses";
  public router = express.Router();

  private expanses: DbInstance;

  constructor() {
    super();
    this.initializeRoutes();
    this.expanses = new DbInstance();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllExpanses);
    this.router.get(`${this.path}/:id`, this.getExpanseById);
    this.router.post(
      this.path,
      validationMiddleware(CreateExpanseDto),
      this.createExpanse
    );
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreateExpanseDto, true),
      this.updateExpanse
    );
    this.router.delete(`${this.path}/:id`, this.deleteExpanse);
  }

  private getAllExpanses = (
    _request: express.Request,
    response: express.Response
  ) => {
    response.send(this.expanses.getAll<Expanse>());
  };

  private createExpanse = (
    request: express.Request,
    response: express.Response
  ) => {
    const expanse: CreateExpanseDto = request.body;

    response.send(this.expanses.create<Expanse>(expanse));
  };

  private getExpanseById = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const expanse = this.expanses.getById(Number(id));
    if (expanse) {
      response.send(expanse);
      return;
    }

    next(new ExpanseNotFoundException(id));
  };

  private updateExpanse = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const updateExpanse: Partial<Expanse> = request.body;
    const id = request.params.id;
    const newExpanse = this.expanses.editById(Number(id), updateExpanse);
    if (newExpanse) {
      response.send(newExpanse);
      return;
    }

    next(new ExpanseNotFoundException(id));
  };

  private deleteExpanse = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const isExpanseDeleted = this.expanses.deleteById(Number(id));
    if (isExpanseDeleted) {
      response.send(200);
      return;
    }

    next(new ExpanseNotFoundException(id));
  };
}

export default ExpansesController;
