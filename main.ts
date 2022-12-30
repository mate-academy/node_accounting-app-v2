import ExpansesController from "./src/expanses/expanses.controller";
import UserController from "./src/users/users.controller";
import App from "./src/app";

const app = new App([new UserController(), new ExpansesController()], 8000);

app.listen();
