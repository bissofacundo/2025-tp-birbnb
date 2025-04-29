//TODO: agregar imports

export const NotificationController = {
    crearNoti(reserva, mensaje){
        notificacion = FactoryNotification.crearSegunReserva(reserva)
        notificacion.mensaje = mensaje
        return notificacion
    }
}

