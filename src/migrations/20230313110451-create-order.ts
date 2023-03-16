'use strict';

import { QueryInterface, DataTypes } from 'sequelize';
import Sequelize from 'sequelize';
import { OrdertypeEnum } from '../constants/enums';
import { enumKeys } from '../helpers/helper';

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('orders', {
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            addressId: {
                type: DataTypes.STRING(150),
                allowNull: false
            },
            status:{
              type: DataTypes.ENUM(...enumKeys(OrdertypeEnum)),
              defaultValue: OrdertypeEnum.pending,
              allowNull:false
            },
            createdAt: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            updatedAt: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                allowNull: false
            }
        });
    },
    down: (queryInterface: QueryInterface, Sequelize: any) => {
        return queryInterface.dropTable('users');
    }
};