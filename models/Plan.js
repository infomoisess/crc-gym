import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let planSchema = new Schema({
  id: { type: Schema.Types.UUID },
  nombre: { type: String, required: true, unique: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  color: { type: String, required: true },
});

planSchema.plugin(mongooseUniqueValidator);
let Plan = mongoose.model("Planes", planSchema);

export default Plan;
