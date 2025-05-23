
export class UsuarioService {
    usuarioRepository
    notificacionService
    constructor(usuarioRepository, notificacionService){
        this.usuarioRepository = usuarioRepository
        this.notificacionService = notificacionService
    }

    async guardarNotificacion(id, notificacion){
        notificacionMongo = await NotificacionService.crearNotificacion(notificacion)
        return this.usuarioRepository.agregarNotificacion(id, notificacionMongo.id).bind(this)
    }
}