import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  id: { type: Schema.Types.UUID },
  nombre: { type: String, required: true },
});

categoriaSchema.plugin(mongooseUniqueValidator);
let Categoria = mongoose.model("Categorias", planSchema);

export default Categoria;
