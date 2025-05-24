import { FactoryNotificacion } from "../domain/factoryNotificacion.js"
import { ValidacionInvalida } from "../exceptions/datosInvalidos.js"
import mongoose, { isValidObjectId } from "mongoose"


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
            id_usuario: req.query.id_usuario,
            leida: req.query.leida
        }
        if(filtros.id_usuario && !isValidObjectId(filtros.id_usuario)) {
            throw new ValidacionInvalida('El ID de usuario no es valido')
        }
        if(filtros.leida && filtros.leida != "true" && filtros.leida != "false"){
            throw new ValidacionInvalida('El parametro leida debe ser true o false')
        }
        const notificaciones = await this.notificacionService.encontrarNotificaciones(filtros)
        res.status(200).json(notificaciones)
        } catch (error) {
            if(!error.status) {
                console.log(error)
                res.status(500).json({error: "Error en el servidor"})
            } else {
                res.status(error.status).json({error: error.message, tipoError: error.nombreError})
            }
        }
    }

    async marcarComoLeida(req, res) {
        try{
            const id = req.params.id_notificacion
            if( !isValidObjectId(id)) {
                throw new ValidacionInvalida('El ID de la notificacion no es valido')
            }
            const notificacionLeida = await this.notificacionService.marcarNotificacionComoLeida(id)
            res.status(200).json(notificacionLeida)
        } catch (error) {
            if(!error.status) {
                console.log(error)
                res.status(500).json({error: "Error en el servidor"})
            } else {
                res.status(error.status).json({error: error.message, tipoError: error.nombreError})
            }
        }
    }
}

