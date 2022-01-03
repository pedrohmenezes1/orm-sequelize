import Sequelize, { Model } from 'sequelize';

class Turmas extends Model {
  static init(sequelize) {
    super.init(
      {
        data_inicio: Sequelize.DATEONLY,
      },

      {
        sequelize,
        tableName: 'Turmas',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Matriculas, {
      foreignKey: 'turma_id',
      as: 'matriculas',
    });
    this.belongsTo(models.Pessoas, {
      foreignKey: 'docente_id',
      as: 'pessoas',
    });
    this.belongsTo(models.Niveis, {
      foreignKey: 'nivel_id',
      as: 'niveis',
    });
  }
}

export default Turmas;
