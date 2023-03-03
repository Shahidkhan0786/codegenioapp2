'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Product.init({
//     title: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Product',
//   });
//   return Product;
// };


import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { sequelize } from "../config/connection";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  id: number;
  title: string;
  price: string;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    price:{
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    categoryId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: "TIMESTAMP",
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
    // timestamps: false,
  }
);