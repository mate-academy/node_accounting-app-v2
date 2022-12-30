import * as express from "express";
import * as bodyParser from "body-parser";
import errorMiddleware from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.init(controllers);
  }

  private init(controllers: Controller[]) {
    this.app.use(bodyParser.json());

    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });

    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`app listening on port ${this.port}`);
    });
  }
}

export default App;
