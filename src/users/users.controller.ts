import { Router } from "express";
import * as express from "express";
import User from "./users.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "./users.dto";
import UserNotFoundException from "../exceptions/UserNotFoundException";

class UserController {
  public path = "/users";
  public router = Router();
  private users = [];

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
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
      this.editUser
    );
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  private getAllUsers = (
    _request: express.Request,
    response: express.Response
  ) => {
    response.send(this.users);
  };

  private createUser = (
    request: express.Request,
    response: express.Response
  ) => {
    const user: User = request.body;
    this.users.push(user);
    response.send(user);
  };

  private getUserById = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const userIndex = this.users.findIndex((user) => user.id === Number(id));
    if (userIndex > -1) {
      response.send(this.users[userIndex]);
    } else {
      next(new UserNotFoundException(id));
    }
  };

  private editUser = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const updateuser: Partial<User> = request.body;
    const id = request.params.id;
    const userIndex = this.users.findIndex((user) => user.id === Number(id));
    if (userIndex > -1) {
      const newuser = {
        ...this.users[userIndex],
        ...updateuser,
      };
      this.users[userIndex] = {
        ...newuser,
      };
      response.send(newuser);
    } else {
      next(new UserNotFoundException(id));
    }
  };

  private deleteUser = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const userIndex = this.users.findIndex((user) => user.id === Number(id));
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
      response.send(200);
    } else {
      next(new UserNotFoundException(id));
    }
  };
}

export default UserController;
