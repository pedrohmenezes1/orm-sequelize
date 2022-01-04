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
        paranoid: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Turmas, {
      foreignKey: 'nivel_id',
      as: 'turmas',
    });
  }
}
export default Niveis;
