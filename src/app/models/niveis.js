import Sequelize, { Model } from 'sequelize';

class Niveis extends Model {
  static init(sequelize) {
    super.init(
      {
        descr_nivel: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'niveis',
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.turmas, {
      foreignKey: 'nivel_id',
      as: 'turma',
    });
  }
}
export default Niveis;
