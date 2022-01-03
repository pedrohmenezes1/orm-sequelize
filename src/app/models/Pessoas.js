import Sequelize, { Model } from 'sequelize';

class Pessoas extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        ativo: Sequelize.BOOLEAN,
        email: Sequelize.STRING,
        role: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'pessoas',
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.turmas, {
      foreignKey: 'docente_id',
    });
    this.hasMany(models.matriculas, {
      foreignKey: 'estudante_id',
    });
  }
}
export default Pessoas;
