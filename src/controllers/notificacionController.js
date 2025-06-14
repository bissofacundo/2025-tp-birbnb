import { ValidacionInvalida } from "../exceptions/datosInvalidos.js"
import { isValidObjectId } from "mongoose"
import { MapperError } from "../exceptions/handlerExceptionYMapper/mapperErrores.js"
import { EntidadNoEncontrada } from "../exceptions/busquedaEntidad.js"
import { ErrorDeHandler } from "../exceptions/handlerExceptionYMapper/errorDeHandler.js"

const mapperComunErroresEndpoints = () => {
    const mapperError = new MapperError()
    mapperError.agregarErrorStatusCode(ValidacionInvalida, 400)
    mapperError.agregarErrorStatusCode(EntidadNoEncontrada, 404)
    return mapperError
}

export class NotificacionController  {
    constructor(notificacionService) {
        this.notificacionService = notificacionService
    }


    async obtenerNotificaciones(req, res, next) {
      const mapperError = mapperComunErroresEndpoints()
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
            next(new ErrorDeHandler(error,  mapperError.buscarStatusCodeEnMapper(error)))
        }
    }

    async marcarComoLeida(req, res, next) {
        const mapperError = mapperComunErroresEndpoints()
        try{
            const id = req.params.id_notificacion
            if( !isValidObjectId(id)) {
                throw new ValidacionInvalida('El ID de la notificacion no es valido')
            }
            const notificacionLeida = await this.notificacionService.marcarNotificacionComoLeida(id)
            res.status(200).json(notificacionLeida)
        } catch (error) {
            next(new ErrorDeHandler(error,  mapperError.buscarStatusCodeEnMapper(error)))
        }
    }
}

