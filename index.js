import express from ("express")
import CambiarEstadoController from ("./controllers/cambiarEstadoController.js")

const app = express()
const router = app.Router()

router.put("/reservas/:id/estado", CambiarEstadoController.cambiarEstado)

router.get("healthCheck",(req, res)=>{
    res.status(200).json({ status: 'La página funciona Correctamente :D' });
  } )