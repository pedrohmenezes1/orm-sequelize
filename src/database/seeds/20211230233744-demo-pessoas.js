module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'Pessoas',
      [
        {
          nome: 'Ana Souza',

          ativo: true,

          email: 'ana@ana.com',

          role: 'estudante',

          created_at: new Date(),

          updated_at: new Date(),
        },

        {
          nome: 'Marcos Cintra',

          ativo: true,

          email: 'marcos@marcos.com',

          role: 'estudante',

          created_at: new Date(),

          updated_at: new Date(),
        },

        {
          nome: 'Felipe Cardoso',

          ativo: true,

          email: 'felipe@felipe.com',

          role: 'estudante',

          created_at: new Date(),

          updated_at: new Date(),
        },

        {
          nome: 'Sandra Gomes',

          ativo: false,

          email: 'sandra@sandra.com',

          role: 'estudante',

          created_at: new Date(),

          updated_at: new Date(),
        },

        {
          nome: 'Paula Morais',

          ativo: true,

          email: 'paula@paula.com',

          role: 'docente',

          created_at: new Date(),

          updated_at: new Date(),
        },

        {
          nome: 'Sergio Lopes',

          ativo: true,

          email: 'sergio@sergio.com',

          role: 'docente',

          created_at: new Date(),

          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('Pessoas', null, {}),
};
