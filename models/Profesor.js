import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let profesorSchema = new Schema({
  id: { type: Schema.Types.UUID },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
});

profesorSchema.plugin(mongooseUniqueValidator);
let Profesor = mongoose.model("Profesores", planSchema);

export default Profesor;
