import express from ("express")
import CambiarEstadoController from ("./controllers/cambiarEstadoController.js")

const app = express()
const router = app.Router()

router.put("/reservas/:id/estado", CambiarEstadoController.cambiarEstado)