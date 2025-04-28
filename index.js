import express from ("express")
import ReservaController from ("./controllers/reservaController.js")

const app = express()
const router = app.Router()

router.put("/reservas/:id/estado", ReservaController.cambiarEstado)