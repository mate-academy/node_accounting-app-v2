import { Router } from "express";

abstract class Controller {
  path: string;
  router: Router;

  abstract initializeRoutes(): void;
}

export default Controller;
