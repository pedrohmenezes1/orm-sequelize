import Sequelize from 'sequelize';
import DatabaseConfig from '../config/database';

import Pessoas from '../app/models/pessoas';
import Niveis from '../app/models/niveis';
import Turmas from '../app/models/turmas';
import Matriculas from '../app/models/matriculas';

// Buffer
const models = [Pessoas, Niveis, Turmas, Matriculas];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa conexão
    this.connection = new Sequelize(DatabaseConfig);

    // Percorre o vetor e acessa o método inicializador
    models
      .map((model) => model.init(this.connection))
      .map((model) => {
        if (model.associate) model.associate(this.connection.models);
        return model;
      });
  }
}

export default new DataBase();
