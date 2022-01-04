import Sequelize, { Model } from 'sequelize';

class Pessoas extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        ativo: Sequelize.BOOLEAN,
        email: {
          type: Sequelize.STRING,
          validate: {
            isEmail: {
              args: true,
              msg: 'insira um e-mail válido',
            },
          },
        },
        role: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'pessoas',
        paranoid: true,
        defaultScope: {
          where: { ativo: true },
        },
        scopes: {
          all: { where: {} },
        },
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
      scope: { status: 'confirmado' },
      as: 'aulasMatriculadas',
    });
    this.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
      as: 'matriculas',
    });
  }
}
export default Pessoas;
