import express from 'express';
import apiRotas from './routes/routes';
import './database';

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
    this.server.use(apiRotas);
  }
}

export default new App().server;
