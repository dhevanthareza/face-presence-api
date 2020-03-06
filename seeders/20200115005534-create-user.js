'use strict';
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [
      {
        username: 'admin',
        firstname: 'Admin',
        lastname: 'Ganteng',
        password: bcrypt.hashSync('secret'),
        roleId: 1,
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        username: 'teacher',
        firstname: 'Guru',
        lastname: 'Idaman',
        password: bcrypt.hashSync('secret'),
        roleId: 2,
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        username: 'student',
        firstname: 'Murid',
        lastname: 'Jagoan',
        password: bcrypt.hashSync('secret'),
        roleId: 4,
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        username: 'studentpremium',
        firstname: 'Murid',
        lastname: 'Kaya',
        password: bcrypt.hashSync('secret'),
        roleId: 5,
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('User', null, {});
  }
};
