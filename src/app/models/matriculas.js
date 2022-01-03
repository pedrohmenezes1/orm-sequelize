import Sequelize, { Model } from 'sequelize';

class Matriculas extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
      },

      {
        sequelize,
        tableName: 'matriculas',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.pessoas, {
      foreignKey: 'estudante_id',
    });
    this.belongsTo(models.turmas, {
      foreignKey: 'turma_id',
    });
  }
}

export default Matriculas;
