module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'admin',
  database: 'orm-sequelize',
  define: {
    timestamps: true,
    // Converte tabelas e colulas camelCase para sublinhado
    underscored: true,
    // Converte nomes de modelo camelCase para sublinhado
    underscoredAll: true,
  },
};
