module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Niveis', {
      id: {
        allowNull: false,

        autoIncrement: true,

        primaryKey: true,

        type: Sequelize.INTEGER,
      },

      descr_nivel: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        allowNull: false,

        type: Sequelize.DATE,
      },

      updated_at: {
        allowNull: false,

        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Niveis');
  },
};
