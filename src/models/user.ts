const { userInfo } = require('os');
import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from "../config/connection";
import {Customer} from "./customer"
import { UserTypeEnum } from '../constants/enums';
import { enumKeys } from '../helpers/helper';
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: number;
  firstName: string
  lastName: string
  email: string
  userType: string
  password: string
  createdAt?: Date
  updatedAt?: Date

  getFullname() {
      return [this.firstName, this.lastName].join(' ');
  }
}

User.init({
  id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
  },
  firstName: {
      type: DataTypes.STRING(50)
  },
  lastName: {
      type: DataTypes.STRING(50)
  },
  email: {
      type: DataTypes.STRING(150),
      allowNull: false
  },
  userType: {
    type: DataTypes.ENUM(...enumKeys(UserTypeEnum)),
    defaultValue: UserTypeEnum.Customer,
    allowNull: false
},
  password: {
      type: DataTypes.STRING(1000),
      allowNull: false
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
  tableName: 'users',
 
});

User.hasOne(Customer, {
  foreignKey: 'userId'
});

