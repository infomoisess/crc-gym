import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  id: { type: Schema.Types.UUID },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  claseId: [{ type: Schema.Types.UUID, required: true }],
  planId: { type: Schema.Types.UUID, required: true },
});

usuarioSchema.plugin(mongooseUniqueValidator);
let Usuario = mongoose.model("Usuarios", usuarioSchema);

export default Usuario;
