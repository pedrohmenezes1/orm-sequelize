import Sequelize from "sequelize";
import DatabaseConfig from "../config/database";

import Pessoas from "../app/models/Pessoas";

// Buffer
const models = [Pessoas];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa conexão
    this.connection = new Sequelize(DatabaseConfig);

    // Percorre o vetor e acessa o método inicializador
    models.map((model) => model.init(this.connection));
  }
}

export default new DataBase();
