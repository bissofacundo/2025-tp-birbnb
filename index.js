import express from "express"
import { configurarRutas } from "./routes/routes.js";

import { AlojamientoController } from "./controllers/alojamientoController.js";
import { AlojamientoService } from "./services/alojamientoService.js";

import dotenv from "dotenv";
dotenv.config();

const puerto = 3000
const app = express()
app.use(express.json()) // es para que entienda/poder usar (req,res)

const alojamientoService = new AlojamientoService();
const alojamientoController = new AlojamientoController(alojamientoService); 


configurarRutas(app,{alojamientoController})

app.get("/healthCheck", (req, res) => {
  res.status(200).json({ status: 'La página funciona Correctamente :D' });
})

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}!`)
})