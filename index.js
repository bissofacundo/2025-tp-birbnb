import express from "express"
import { CambiarEstadoController } from "./controllers/cambiarEstadoController.js"
import { ReservaController } from "./controllers/reserva_controller.js"
import { UsuariosController } from "./controllers/usuarios_controller.js"
import { MongoDBClient } from "./config/database.js"
import { UsuarioRepository } from "./repositories/usuario_repository.js"
import { ReservaService } from "./services/reserva_service.js"
import { UsuarioService } from "./services/usuario_service.js"
import { NotificacionService } from "./services/notificacion_service.js"
import { NotificacionRepository } from "./repositories/notificacion_repository.js"
import { ReservaRepository } from "./repositories/reserva_repository.js"
const puerto = 3000 //meter en .env
const app = express()
app.use(express.json())

MongoDBClient.connect()

const notificacionService = new NotificacionService(NotificacionRepository)
const usuarioService = new UsuarioService(UsuarioRepository, notificacionService)
const reservaService = new ReservaService(ReservaRepository, usuarioService)

const usuariosController = new UsuariosController(UsuarioRepository)
const reservaController = new ReservaController(reservaService)

app.put("/reservas/:id/estado", CambiarEstadoController.cambiarEstado)

app.get("/healthCheck", (req, res) => {
  res.status(200).json({ status: 'La página funciona Correctamente :D' });
})

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}!`)
})

app.patch("/reservas/:id", (req, res) => {
  reservaController.cancelarReserva(req, res)
})

app.get("/usuarios/:id/reservas", (req, res) => {
  usuariosController.obtenerReservas(req, res)
})