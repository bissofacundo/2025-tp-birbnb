import { Notificacion } from "../models/domain/notificacion.js";

export class NotificacionService {
    notificacionRepository
    usuarioRepository

    constructor(notificacionRepository,usuarioRepository) {
        this.notificacionRepository = notificacionRepository;
        this.usuarioRepository = usuarioRepository;
    }

    async encontrarNotificaciones(filtros) {
        const notificaciones = await this.notificacionRepository.encontrarNotificaciones(filtros);
        return notificaciones.map(notificacion => this.aNotificacionREST(notificacion));
    }

    async guardarNotificacion(notificacion) {
        const {id_usuario, mensaje} = notificacion;

        if(!id_usuario || !mensaje) {
            throw new Error(`El id de usuario y el mensaje son obligatorios, se recibio id_usuario: ${id_usuario} y mensaje: ${mensaje}`);
        }

        const usuario = await this.usuarioRepository.encontrarUsuarioPorId(id_usuario);
        if (!usuario) {
            throw new Error(`No se encontró el usuario con id ${id_usuario}`);
        }

        const nuevaNotificacion = new Notificacion(usuario, mensaje);
        const notificacionGuardada = await this.notificacionRepository.guardarNotificacion(nuevaNotificacion);
        return this.aNotificacionREST(notificacionGuardada);
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