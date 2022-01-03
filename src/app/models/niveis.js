import Sequelize, { Model } from 'sequelize';

class Niveis extends Model {
  static init(sequelize) {
    super.init(
      {
        descr_nivel: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'Niveis',
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Turmas, {
      foreignKey: 'nivel_id',
      as: 'Turmas',
    });
  }
}
export default Niveis;
