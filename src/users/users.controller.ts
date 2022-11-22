import { Router } from "express";
import * as express from "express";
import User from "./users.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "./users.dto";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import DbInstance from "../db/db.instance";
import Controller from "../interfaces/controller.interface";

class UserController extends Controller {
  public path = "/users";
  public router = Router();
  private users: DbInstance;

  constructor() {
    super();
    this.initializeRoutes();
    this.users = new DbInstance();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);

    this.router.post(
      this.path,
      validationMiddleware(CreateUserDto),
      this.createUser
    );
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreateUserDto, true),
      this.updateUser
    );
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  private getAllUsers = (
    _request: express.Request,
    response: express.Response
  ) => {
    response.send(this.users.getAll<User>());
  };

  private createUser = (
    request: express.Request,
    response: express.Response
  ) => {
    const user: CreateUserDto = request.body;
    response.send(this.users.create<User>(user));
  };

  private getUserById = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const user = this.users.getById<User>(Number(id));
    if (user) {
      response.send(user);
      return;
    }
    next(new UserNotFoundException(id));
  };

  private updateUser = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const updatePayload: Partial<User> = request.body;
    const id = request.params.id;
    const updatedUser = this.users.editById(Number(id), updatePayload);
    if (updatedUser) {
      response.send(updatedUser);
      return;
    }

    next(new UserNotFoundException(id));
  };

  private deleteUser = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const isUserDeleted = this.users.deleteById(Number(id));
    if (isUserDeleted) {
      response.send(200);
      return;
    }

    next(new UserNotFoundException(id));
  };
}

export default UserController;
