import { UsuarioRepository } from "../repositories/usuario_repository.js"
import { NotificacionService } from "./notificacion_service.js"

export const UsuarioService = {
    async guardarNotificacion(id, notificacion){
        notificacionMongo = await NotificacionService.crearNotificacion(notificacion)
        return UsuarioRepository.agregarNotificacion(id, notificacionMongo.id)
    }
}