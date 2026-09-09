'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const adminHash = await bcrypt.hash('admin12345', 10);
    const memberHash = await bcrypt.hash('member12345', 10);
    
    await queryInterface.bulkInsert('Users', [
      {name: 'Apple David', email: 'apple1833@gmail.com', password: adminHash, role: 'admin', createdAt: now, updatedAt: now},
      {name: 'Bobby Finn', email: 'bobbyfinn@gmail.com', password: memberHash, role: 'member', createdAt: now, updatedAt: now},
      {name: 'Cole Mimaybe', email: 'colemmb@gmail.com', password: memberHash, role: 'member', createdAt: now, updatedAt: now},
      {name: 'Donna Tello', email: 'dversace@gmail.com', password: memberHash, role: 'member', createdAt: now, updatedAt: now},
      {name: 'Electra Fan', email: 'hanabishiappliances@gmail.com', password: memberHash, role: 'member', createdAt: now, updatedAt: now},
    ]);
    const users = await queryInterface.sequelize.query('SELECT id, name FROM "Users";', {type: Sequelize.QueryTypes.SELECT});
    const idOf = (name) => users.find((u) => u.name === name).id;
    
    await queryInterface.bulkInsert('Tasks', [
      {title: 'Be stiff', dueDate: now, completed: false, userId: idOf('Apple David'), createdAt: now, updatedAt: now},
      {title: 'Sew clothes', dueDate: now, completed: true, userId: idOf('Bobby Finn'), createdAt: now, updatedAt: now},
      {title: 'Ring someone', dueDate: now, completed: false, userId: idOf('Cole Mimaybe'), createdAt: now, updatedAt: now},
      {title: 'Be a painter', dueDate: now, completed: false, userId: idOf('Donna Tello'), createdAt: now, updatedAt: now},
      {title: 'Open the fan', dueDate: now, completed: false, userId: idOf('Electra Fan'), createdAt: now, updatedAt: now}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
