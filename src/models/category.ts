import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { sequelize } from "../config/connection";

export class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: false,
  }
);

// module.exports = (sequelize: any, DataTypes: any) => {
//   class Category extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models:any) {
//       // define association here
//     }
//   }

//   Category.init({
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Category',
//   });
//   return Category;
// };
