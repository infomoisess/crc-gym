import mongoose from "mongoose";

let Schema = mongoose.Schema;

let claseSchema = new Schema({
  disciplina: {
    type: String,
    enum: [
      "Entrenamiento funcional",
      "PFT",
      "WFT",
      "HIIT",
      "Indoor Rowing",
      "Power Rowing",
      "Cycling",
      "Training Body Cycling",
      "Stretching",
    ],
  },
  colorDisciplina: {
    type: String,
    enum: [
      "FF514F",
      "953FFF",
      "FAE355",
      "1DE591",
      "FAB855",
      "FF514F",
      "953FFF",
      "FAE355",
      "1DE591",
    ],
  },
  duracion: {
    type: String,
  },
  diaDeLaSemana: {
    type: String,
    enum: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
  },
  hora: {
    type: String,
  },
});

let Clase = mongoose.model("Clases", claseSchema);

export default Clase;
