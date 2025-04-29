//TODO: agregar imports

export const NotificationController = {
    crearNotificacion(reserva, mensaje){
        notificacion = FactoryNotification.crearSegunReserva(reserva)
        if(Estado.CANCELADA === reserva.Estado) {
            notificacion.mensaje = mensaje
        }
        return notificacion
    }
}

