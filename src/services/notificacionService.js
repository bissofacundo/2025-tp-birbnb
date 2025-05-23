export class NotificacionService {
    notificacionRepository
    constructor(notificacionRepository){
        this.notificacionRepository = notificacionRepository
    }

    async crearNotificacion(notificacion){
        if(!notificacion.usuario){
            //TODO
        }
        if(!notificacion.mensaje){
            //TODO
        }
        if(notificacion.leida){
            console.log("la notificacion no puede crearse en estado leida") //throw error
        }
        return await this.notificacionRepository.guardarNotificacion(notificacion).bind(this)
    }
}