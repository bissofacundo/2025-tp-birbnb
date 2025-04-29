import { FactoryNotification } from "../domain/factory_notificacion.js"

export const NotificationController = {
    crearNoti(reserva, mensaje){
        notificacion = FactoryNotification.crearSegunReserva(reserva)
        notificacion.mensaje = mensaje
        return notificacion
    }
}

