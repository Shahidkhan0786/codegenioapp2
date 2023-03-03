// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// import { QueryInterface, DataTypes } from 'sequelize';

// module.exports = {
//   async up(queryInterface:QueryInterface) {
//     await queryInterface.createTable('Products', );
//   },
//   async down(queryInterface:QueryInterface, Sequelize:any) {
//     await queryInterface.dropTable('Products');
//   }
// };

module.exports = {
  up: (queryInterface,Sequelize) => {
      return queryInterface.createTable('Products', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.STRING
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Products');
  }
};