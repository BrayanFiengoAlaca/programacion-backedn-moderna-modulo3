//Le dice a la base de datos cómo debe verse una nota guardada.
//Es el model de la base de datos, es decir, la estructura que tendrá cada nota guardada en la base de datos.
import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    isPrivate: { type: Boolean, default: false },
    password: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

export default model('Note', noteSchema);