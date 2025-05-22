import { FactoryNotificacion } from "../models/domain/factory_notificacion.js"

export class NotificacionController  {
    constructor(notificacionService) {
        this.notificacionService = notificacionService
    }

    crearNotificacion(reserva, mensaje){
        notificacion = FactoryNotificacion.crearSegunReserva(reserva)
        if(Estado.CANCELADA === reserva.Estado) {
            notificacion.mensaje = mensaje
        }
        return notificacion
    }

    async obtenerNotificaciones(req, res) {
      try { 
        const filtros = {
            usuario: req.params.id_usuario,
            leida: req.query.leida
        }
        const notificaciones = await this.notificacionService.encontrarNotificaciones(filtros)
        res.status(200).json(notificaciones)
        } catch (error) {
            console.error(error)
            res.status(404).json({ message: 'No se encontraron las notificaciones solicitadas' })
        }
    }

    async marcarComoLeida(req, res) {
        try{
            const notificacionLeida = await this.notificacionService.marcarNotificacionComoLeida(req.params.id)
            res.status(200).json(notificacionLeida)
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: 'No se pudo marcar la notificacion como leida' })
        }
    }
}

