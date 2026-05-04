//Le dice a la base de datos cómo debe verse una nota guardada.
//Es el model de la base de datos, es decir, la estructura que tendrá cada nota guardada en la base de datos.
import { DataTypes } from "sequelize";
import sequelize from "./connection.js";

const NoteModel = sequelize.define(
  "Note",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    imageUrl: { type: DataTypes.STRING },
    isPrivate: { type: DataTypes.BOOLEAN, defaultValue: false },
    password: { type: DataTypes.STRING },
    userId: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
  },
);

export default NoteModel;