import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongooseUniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  claseId: [{ type: Schema.Types.ObjectId, ref: "Clase" }],
  planId: { type: Schema.Types.ObjectId, ref: "Plan" },
});

usuarioSchema.plugin(mongooseUniqueValidator);
usuarioSchema.methods.comparePassword = function (candidatePassword) {
  return candidatePassword === this.password;
};

let Usuario = mongoose.model("Usuarios", usuarioSchema);

export default Usuario;
