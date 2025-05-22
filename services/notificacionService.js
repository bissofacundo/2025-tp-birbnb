import { Notificacion } from "../models/domain/notificacion.js";

export class NotificacionService {
    notificacionRepository

    constructor(notificacionRepository) {
        this.notificacionRepository = notificacionRepository;
    }

    async encontrarNotificaciones(filtros) {
        const notificaciones = await this.notificacionRepository.encontrarNotificaciones(filtros);
        return notificaciones.map(notificacion => this.aNotificacionREST(notificacion));
    }

    async marcarNotificacionComoLeida(id) {
        const notificacion = await this.notificacionRepository.encontrarNotificacionPorId(id);
        if (!notificacion) {
            throw new Error(`No se encontró la notificación con id ${id}`);
        }// ver posibilidad de midelware
        notificacion.marcarComoLeida();
        const notificacionLeida = await this.notificacionRepository.actualizarNotificacion(notificacion);
        return this.aNotificacionREST(notificacionLeida);
    }

    aNotificacionREST(notificacion) {
        return {
            id: notificacion._id,
            usuario: notificacion.usuario,
            mensaje: notificacion.mensaje,
            fechaAlta: notificacion.fechaAlta,
            leida: notificacion.leida,
            fechaLeida: notificacion.fechaLeida
        };
    }

}