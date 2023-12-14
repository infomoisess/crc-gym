import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import Usuarios from "./models/Usuario.js";
import Plan from "./models/Plan.js";
import cors from "cors";
import Profesor from "./models/Profesor.js";
import session from "express-session";
import Clase from "./models/Clase.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

const port = process.env.PORT;
app.use(cors());

app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});

app.use(
  session({
    secret: "password123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Endpoints

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

// Planes ID
app.get("/planes/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).send("Plan no encontrado");
    }
    res.send(plan);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Ruta para obtener la lista de profesores
app.get("/profesores", async (req, res) => {
  Profesor.find()
    .then((profesores) => {
      if (!profesores) {
        res.status(404).send("Profesor no encontrado");
      }
      res.send(profesores);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
});

// Ruta para obtener la lista de clases
app.get("/clases", async (req, res) => {
  try {
    const clases = await Clase.find();
    res.json(clases);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Registro
app.post("/usuarios/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, planId } = req.body;
    let usuario = new Usuarios({
      firstName,
      lastName,
      email,
      password,
      planId,
    });
    await usuario.save();
    res.status(200).send({ message: "Usuario registrado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor: " + error.message);
  }
});

// Iniciar sesión
app.post("/usuarios/login", async (req, res) => {
  try {
    console.log(req.body);
    let usuario = await Usuarios.findOne({ email: req.body.email });
    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }
    const isMatch = req.body.password === usuario.password;
    if (!isMatch) {
      return res.status(401).send("Contraseña incorrecta");
    }

    req.session.userId = usuario._id;
    res.status(200).send({
      firstName: usuario.firstName,
      planId: usuario.planId,
      mensaje: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor: " + error.message);
  }
});

// Cerrar sesión
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar la sesión:", err);
      return res.status(500).send("Error al cerrar la sesión");
    }
    res.send("Sesión cerrada con éxito");
  });
});

// Reserva
app.post("/reservas", async (req, res) => {
  console.log(req.body);
  try {
    console.log("Datos recibidos en /reservas:", req.body);

    const { usuarioId, claseId } = req.body;

    console.log("Usuario ID:", usuarioId);
    console.log("Clase ID:", claseId);

    const clase = await Clase.findById(claseId);
    const usuario = await Usuarios.findById(usuarioId);

    console.log("Usuario encontrado:", usuario);
    console.log("Clase encontrada:", clase);

    if (!clase || !usuario) {
      return res.status(404).send("Clase o usuario no encontrado");
    }

    const nuevaReserva = new Reserva({
      usuario: usuarioId,
      clase: claseId,
    });
    await nuevaReserva.save();

    res.status(201).send(nuevaReserva);
  } catch (error) {
    console.error("Error en /reservas:", error);
    res.status(500).send("Error al crear la reserva");
  }
});
