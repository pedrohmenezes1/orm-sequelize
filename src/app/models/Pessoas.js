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
        tableName: 'Pessoas',
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Turmas, {
      foreignKey: 'docente_id',
      as: 'turmas',
    });
    this.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
      as: 'matriculas',
    });
  }
}
export default Pessoas;
