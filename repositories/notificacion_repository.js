export const NotificacionRepository = {
    notificaciones: [],

    guardarNoti(notificacion){
        this.notificaciones.push(notificacion)
    }
}