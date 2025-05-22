import { ReservaRepository } from "../models/repositories/reservaRepository.js"
import { NotificationController } from "./notificationController.js"
import { NotificacionRepository } from "../models/repositories/notificacionRepository.js"
import { CambioEstadoReserva } from "../domain/cambio_estado_reserva.js"

export const CambiarEstadoController = {
    cambiarEstado(req, res) {
        idReserva = req.params.id
        nuevoEstado = req.body.estado
        motivo = req.body.motivo
        usuario = req.body.usuario
        reservaActualizada = ReservaRepository.cambiarEstado(idReserva, nuevoEstado) 
        cambiarEstado = new CambioEstadoReserva( 
            nuevoEstado,
            reservaActualizada,
            motivo,
            usuario
        )
        
        notificacion = NotificationController.crearNotificacion(reservaNueva, cambiarEstado.motivo)
        NotificacionRepository.guardarNotificacion(notificacion)
        res.status(200).json(
            reservaActualizada
        )
    },
}
