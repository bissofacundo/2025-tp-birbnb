import { NotificacionRepository } from "../repositories/notificacion_repository"

export const NotificacionService = {
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
        return await NotificacionRepository.guardarNotificacion(notificacion)
    }
}