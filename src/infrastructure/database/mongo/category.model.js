//TAREA 1 (PASO 2) Le dice a MongoDB cómo debe verse una categoría guardada
import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

export default model('Category', categorySchema);