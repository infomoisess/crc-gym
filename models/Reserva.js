import mongoose from "mongoose";

let Schema = mongoose.Schema;

let reservaSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  clase: { type: Schema.Types.ObjectId, ref: "Clase", required: true },
});

let Reserva = mongoose.model("Reserva", reservaSchema);

export default Reserva;
