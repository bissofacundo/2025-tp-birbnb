import { UsuarioRepository } from "../repositories/usuario_repository"
import { NotificacionService } from "./notificacion_service"

export const UsuarioService = {
    async guardarNotificacion(id, notificacion){
        notificacionMongo = await NotificacionService.crearNotificacion(notificacion)
        return UsuarioRepository.agregarNotificacion(id, notificacionMongo._id)
    }
}