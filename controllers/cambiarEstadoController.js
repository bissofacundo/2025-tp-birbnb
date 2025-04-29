import { Estado } from "../domain/enums/estado_reserva.js"
import { CambioEstadoReserva } from "../domain/cambio_estado_reserva.js"
import { ReservaRepository } from "../repositories/reservaRepository.js"
import { NotificationController } from "./notificationController.js"

export const CambiarEstadoController = {
    cambiarEstado(req, res) {
        idReserva = req.params.id
        nuevoEstado = req.body.estado
        motivo = req.body.motivo
        usuario = req.body.usuario
        reservaActualizada = ReservaRepository.cambiarEstado(idReserva, nuevoEstado) 
        cambiarEstado = new CambioEstadoReserva( //cambioRest
            nuevoEstadostado,
            reservaActualizada,
            motivo,
            usuario
        )
        if(Estado.CANCELADA === cambiarEstado.estado){
            mensaje = motivo
        } else {
            mensaje = ''
        } //devolver error si descubre que el estado es PENDIENTE
        notificacion = NotificationController.crearNoti(reservaNueva, mensaje)
        
        res.status(200).json(
            ...notificacion
        )
    },
    /*
    cambioRest(cambio){}
    */
}