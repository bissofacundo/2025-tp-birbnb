import swaggerUiExpress from "swagger-ui-express"
import { readFile } from "fs/promises"

const swaggerDocument = JSON.parse(
    await readFile(new URL("../../docs/swagger-output.json", import.meta.url)),
  )

export const configureRoutes = (app, {reservaController, usuarioController, alojamientoController, notificacionController}) => {
    app.put("/reservas/:id", reservaController.modificarReserva.bind(reservaController))
    app.post('/reservas', reservaController.crearReserva.bind(reservaController))
    app.get('/usuarios', usuarioController.getUsuarios.bind(usuarioController))
    app.get('/usuarios/:id', usuarioController.getUsuario.bind(usuarioController))
    app.use("/api-docs", swaggerUiExpress.serve)
    app.get("/api-docs", swaggerUiExpress.setup(swaggerDocument))
    app.patch("/reservas/:id", reservaController.cancelarReserva.bind(reservaController))    
    app.get("/usuarios/:id/reservas", usuarioController.obtenerReservas.bind(usuarioController))
    app.get("/alojamientos", alojamientoController.findAll.bind(alojamientoController))
    app.get("/notificaciones", notificacionController.obtenerNotificaciones.bind(notificacionController))     
    app.patch("/notificaciones/:id_notificacion", notificacionController.marcarComoLeida.bind(notificacionController))
}