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
      }
    );
    Pessoas.associate = () => {
      // associações
    };
    return Pessoas;
  }
}
export default Pessoas;
