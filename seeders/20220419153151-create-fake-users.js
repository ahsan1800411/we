'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          email: 'ahsan@gmail.com',
          role: 'admin',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
      await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {}); // to delete all the users
  },
};
