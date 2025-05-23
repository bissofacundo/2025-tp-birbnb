import dotenv from "dotenv";
dotenv.config(); 

import express from "express"
import { MongoDBClient } from "./config/dbConfig.js";
import { configurarRutas } from "./routes/routes.js";
import { UsuarioRepository } from "./repositories/usuarioRepository.js";
import { ReservaRepository } from "./repositories/reservaRepository.js";
import { NotificacionRepository } from "./repositories/notificacionRepository.js";
import { AlojamientoRepository } from "./repositories/alojamientoRepository.js";
import { ReservaService } from "./services/reservaService.js";
import { ReservaController } from "./controllers/reservaController.js";
const puerto = 3000
const app = express()
app.use(express.json())

// eslint-disable-next-line no-undef
MongoDBClient.connect(process.env)

app.get("/healthCheck", (req, res) => {
  res.status(200).json({ status: 'La página funciona Correctamente :D' });
})

const usuarioRepository = new UsuarioRepository();
const alojamientoRepository = new AlojamientoRepository(usuarioRepository);
const reservaRepository = new ReservaRepository(usuarioRepository);
alojamientoRepository.reservaRepository = reservaRepository
reservaRepository.alojamientoRepository = alojamientoRepository
const notificacionRepository = new NotificacionRepository();


const reservaService = new ReservaService(reservaRepository, alojamientoRepository, usuarioRepository, notificacionRepository)
const reservaController = new ReservaController(reservaService)

configurarRutas(app, {reservaController})

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}!`)
})

