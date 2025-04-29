import { FactoryNotificacion } from "../domain/factory_notificacion.js"

export const NotificationController = {
    crearNotificacion(reserva, mensaje){
        notificacion = FactoryNotificacion.crearSegunReserva(reserva)
        if(Estado.CANCELADA === reserva.Estado) {
            notificacion.mensaje = mensaje
        }
        return notificacion
    }
}

