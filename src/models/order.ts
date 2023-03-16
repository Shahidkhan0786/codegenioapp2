const { userInfo } = require('os');
import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from "../config/connection";
import {Customer} from "./customer"
import { OrdertypeEnum } from '../constants/enums';
import { enumKeys } from '../helpers/helper';
export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  id: number;
  productId: string
  userId: string
  addressId: string
  status: string
  createdAt?: Date
  updatedAt?: Date

//   getOrderDetails() {
//       return [this.firstName, this.lastName].join(' ');
//   }
}

Order.init({
  id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
  },
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
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
  },
  updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'orders',
 
});

// User.hasOne(Customer, {
//   foreignKey: 'userId'
// });

