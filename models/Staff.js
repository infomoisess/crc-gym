import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let staffSchema = new Schema({
  id: { type: Schema.Types.UUID },
  nombre: { type: String, required: true, unique: true },
  especialidad: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true, unique: true },
});

planSchema.plugin(mongooseUniqueValidator);
let Staff = mongoose.model("Profesores", staffSchema);

export default Staff;
