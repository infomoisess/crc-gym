import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import Usuarios from "./models/Usuario.js";
import Plan from "./models/Plan.js";
import cors from "cors";
import Profesor from "./models/Profesor.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

const port = process.env.PORT;

app.use(cors());

app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});

// Endpoints

app.get("/usuarios/login", async (req, res) => {
  Usuarios.findOne({ username: req.query.username })
    .then((user) => {
      if (!user) {
        res.status(404).send("Usuario no encontrado");
      } else {
        if (user.password === req.query.password) {
          res.send(user);
        } else {
          res.status(401).send("Contraseña incorrecta");
        }
      }
    })
    .catch((err) => {
      res.status(500).send("Internal server error");
    });
});

// Ruta para obtener la lista de planes
app.get("/planes", async (req, res) => {
  Plan.find()
    .then((planes) => {
      if (!planes) {
        res.status(404).send("Planes no encontrados");
      }
      res.send(planes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

// Ruta para obtener la lista de profesores
app.get("/profesores", async (req, res) => {
  Profesor.find()
    .then((profesores) => {
      if (!profesores) {
        res.status(404).send("Profesor no encontrad");
      }
      res.send(profesores);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});
