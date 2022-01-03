import Sequelize, { Model } from 'sequelize';

class Turmas extends Model {
  static init(sequelize) {
    super.init(
      {
        data_inicio: Sequelize.DATEONLY,
      },

      {
        sequelize,
        tableName: 'turmas',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.matriculas, {
      foreignKey: 'turma_id',
      as: 'matriculas',
    });
    this.belongsTo(models.pessoas, {
      foreignKey: 'docente_id',
      as: 'pessoas',
    });
    this.belongsTo(models.niveis, {
      foreignKey: 'nivel_id',
      as: 'niveis',
    });
  }
}

export default Turmas;
