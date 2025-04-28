//TODO: agregar imports

export const NotificationController = {
    crearNoti(reserva){
        return FactoryNotification.crearSegunReserva(reserva)
    },

    aniadirMotivo(motivo, notificacion) {
        return {...notificacion, motivo}
    }
}