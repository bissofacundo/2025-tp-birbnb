export const NotificacionRepository = {
    notificaciones: [],

    guardarNotificacion(notificacion){
        this.notificaciones.push(notificacion)
    }
}