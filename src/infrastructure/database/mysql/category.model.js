//TAREA 1 (PASO 2) Le dice a MySQL cómo debe verse una categoría guardada
import { DataTypes } from "sequelize";
import sequelize from "./connection.js";

const CategoryModel = sequelize.define(
  "Category",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

export default CategoryModel;