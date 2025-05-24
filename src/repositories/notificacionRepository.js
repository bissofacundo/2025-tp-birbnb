import { NotificacionModel } from "../schemas/notificacionSchema.js"



export class NotificacionRepository  {
    model
    // notificaciones: [],
    constructor() {
        this.model = NotificacionModel;
    }
    // guardarNotificacion(notificacion){
    //     this.notificaciones.push(notificacion)
    // }

    async encontrarNotificaciones(filtro) {
        const query = {};
        if (filtro.id_usuario) {
            query.usuario = filtro.id_usuario;
        }
        if (filtro.leida !== undefined) {
            query.leida = filtro.leida;
        }

        return await this.model.find(query).populate('usuario');
    }

    async encontrarNotificacionPorId(id) {
        return await this.model.findById(id).populate('usuario');
    }

    async guardarNotificacion(notificacion) {
        const nuevaNotificacion = new this.model(notificacion);
        const notificacionGuardada = await nuevaNotificacion.save();

        return notificacionGuardada;
    }

    async actualizarNotificacion(notificacion) {
        return await this.model.findByIdAndUpdate(notificacion.id, notificacion, { new: true });
    }
    

}