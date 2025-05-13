import express from "express"
import { CambiarEstadoController } from "./controllers/cambiarEstadoController.js"
const puerto = 3000
const app = express()
app.use(express.json())

app.put("/reservas/:id/estado", CambiarEstadoController.cambiarEstado)

app.get("/healthCheck", (req, res) => {
  res.status(200).json({ status: 'La página funciona Correctamente :D' });
})

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}!`)
})