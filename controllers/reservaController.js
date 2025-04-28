//TODO: agregar imports
import { ReservaRepository } from "../repositories/reservaRepository"
import { NotificationController } from "./notificationController"

export const ReservaController = {
    cambiarEstado(req, res) {
        idReserva = req.params.id
        nuevoEstado = req.body.estado
        motivo = req.body.motivo
        reservaNueva = ReservaRepository.cambiarEstado(idReserva, nuevoEstado) 
        notificacion = NotificationController.crearNoti(reservaNueva)
        if(Estado.comparar(nuevoEstado, Estado.CANCELADA)){ //crear este metodo o usar Estado.CANCELADA.nombre ==== nuevoEstado ? 
            notificacionAEnviar = NotificationController.aniadirMotivo(motivo, notificacion)
        } else {
            notificacionAEnviar = notificacion
        }
        res.status(200).json(
            ...notificacionAEnviar
        )
    }
}