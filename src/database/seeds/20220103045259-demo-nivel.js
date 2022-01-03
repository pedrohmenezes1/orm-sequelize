module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'Niveis',

      [
        {
          descr_nivel: 'básico',

          created_at: new Date(),

          updated_at: new Date(),
        },

        {
          descr_nivel: 'intermediário',

          created_at: new Date(),

          updated_at: new Date(),
        },

        {
          descr_nivel: 'avançado',

          created_at: new Date(),

          updated_at: new Date(),
        },
      ],

      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('Niveis', null, {}),
};
