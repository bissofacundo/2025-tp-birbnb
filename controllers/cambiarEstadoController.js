//TODO: agregar imports
import { ReservaRepository } from "../repositories/reservaRepository"
import { NotificationController } from "./notificationController"

export const CambiarEstadoController = {
    cambiarEstado(req, res) {
        idReserva = req.params.id
        nuevoEstado = req.body.estado
        motivo = req.body.motivo
        usuario = req.body.usuario
        reservaActualizada = ReservaRepository.cambiarEstado(idReserva, nuevoEstado) 
        cambiarEstado = new CambioEstadoResrva( //cambioRest
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

/*

cambiarEstadoController{

    cambiarEstado = ...
    reserva = reservaController().cambiarEstado()
    if(Estado.CANCELADA === cambiarEstado.estado){
            mensaje = motivo
        } else {
            mensaje = ''
        }
    noti = notificacionController().crearNoti(reserva, mensaje)

    res.status... json(
        ,
        noti
    
    )

}

*/