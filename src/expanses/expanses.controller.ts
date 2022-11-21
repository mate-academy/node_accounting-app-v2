import ExpanseNotFoundException from "../exceptions/ExpanseNotFoundException";
import * as express from "express";
import validationMiddleware from "../middleware/validation.middleware";
import CreateExpanseDto from "./expanses.dto";
import Expanse from "./expanses.interface";

class ExpansesController {
  public path = "/expanses";
  public router = express.Router();

  private expanses: Expanse[] = [];

  constructor() {
    this.initializeRoutes();
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
      this.editExpanse
    );
    this.router.delete(`${this.path}/:id`, this.deleteExpanse);
  }

  private getAllExpanses = (
    request: express.Request,
    response: express.Response
  ) => {
    response.send(this.expanses);
  };

  private createExpanse = (
    request: express.Request,
    response: express.Response
  ) => {
    const expanse: Expanse = request.body;
    this.expanses.push(expanse);
    response.send(expanse);
  };

  private getExpanseById = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const expanseIndex = this.expanses.findIndex(
      (expanse) => expanse.id === Number(id)
    );
    if (expanseIndex > -1) {
      response.send(this.expanses[expanseIndex]);
    } else {
      next(new ExpanseNotFoundException(id));
    }
  };

  private editExpanse = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const updateExpanse: Partial<Expanse> = request.body;
    const id = request.params.id;
    const expanseIndex = this.expanses.findIndex(
      (expanse) => expanse.id === Number(id)
    );
    if (expanseIndex > -1) {
      const newExpanse = {
        ...this.expanses[expanseIndex],
        ...updateExpanse,
      };
      this.expanses[expanseIndex] = {
        ...newExpanse,
      };
      response.send(newExpanse);
    } else {
      next(new ExpanseNotFoundException(id));
    }
  };

  private deleteExpanse = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const expanseIndex = this.expanses.findIndex(
      (expanse) => expanse.id === Number(id)
    );
    if (expanseIndex > -1) {
      this.expanses.splice(expanseIndex, 1);
      response.send(200);
    } else {
      next(new ExpanseNotFoundException(id));
    }
  };
}

export default ExpansesController;
