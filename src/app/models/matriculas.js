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
        paranoid: true,
        defaultScope: {
          where: { status: 'confirmado' },
        },
        scopes: {
          all: { where: {} },
        },
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pessoas, {
      foreignKey: 'estudante_id',
      as: 'pessoas',
    });
    this.belongsTo(models.Turmas, {
      foreignKey: 'turma_id',
      as: 'turmas',
    });
  }
}

export default Matriculas;
