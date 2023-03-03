// const { userInfo } = require('os');
import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from "../config/connection";

export class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> {
  id: number;
  userId: number
  phone: string
  createdAt?: Date
  updatedAt?: Date

//   getFullname() {
//       return [this.firstName, this.lastName].join(' ');
//   }
}

Customer.init({
  id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
  },
  userId: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: false,
    autoIncrement: false,
  },
  phone: {
      type: DataTypes.STRING(50)
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
  tableName: 'customers',
 
});

// Customer.belongsTo(User);

