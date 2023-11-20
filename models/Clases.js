import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let claseSchema = new Schema({
  id: { type: Schema.Types.UUID },
  categoriaId: { type: Schema.Types.UUID, required: true },
  profesorId: { type: Schema.Types.UUID, required: true },
  duracion: { type: Number, required: true },
  diaHora: { type: Date, required: true },
});

claseSchema.plugin(mongooseUniqueValidator);
let Clase = mongoose.model("Clases", planSchema);

export default Clase;
