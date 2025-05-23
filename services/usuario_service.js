
export class UsuariosService {
    usuariosRepository
    notificacionService
    constructor(usuariosRepository, notificacionService){
        this.usuariosRepository = usuariosRepository
        this.notificacionService = notificacionService
    }

    async guardarNotificacion(id, notificacion){
        notificacionMongo = await NotificacionService.crearNotificacion(notificacion)
        return this.usuariosRepository.agregarNotificacion(id, notificacionMongo.id).bind(this)
    }
}