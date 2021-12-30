import express from "express";
import routes from "./routes";
import "./database";

/* app.listen(config.get('app.port'), () => console.log('A API do projeto orm está funcionando!'));
 */
class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
