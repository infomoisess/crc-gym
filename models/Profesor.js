import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let profesorSchema = new Schema({
  id: { type: Schema.Types.UUID },
  nombre: { type: String, required: true, unique: true },
  especialidad: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true, unique: true },
});

planSchema.plugin(mongooseUniqueValidator);
let Profesor = mongoose.model("Staff", profesorSchema);

export default Profesor;
