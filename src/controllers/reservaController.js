import { ValidacionInvalida } from "../exceptions/datosInvalidos.js"
import { isValidObjectId } from "mongoose"

export const aReservaRest = (reserva) => {
    return {
        id: reserva.id,
        huespedReservador: reserva.getNombreHuespedReservador(),
        cantHuespedes: reserva.cantHuespedes,
        alojamiento: reserva.getNombreAlojamiento(),
        fechaInicio: reserva.getFechaInicio(),
        fechaFin: reserva.getFechaFin(),
        estado: reserva.estado.toString(),
        precioPorNoche: reserva.precioPorNoche
    }
}

export class ReservaController {
    reservaService
    constructor(reservaService) {
        this.reservaService = reservaService
    }

    async crearReserva(req, res) {
        try {
            const idAlojamiento = req.body.alojamiento
            const rangoDefechas = { fechaInicio: new Date(req.body.fechaInicio), 
                                  fechaFin: new Date(req.body.fechaFin)} 
            const idHuespedReservador = req.body.huespedReservador
            const cantHuespedes = req.body.cantHuespedes

            if(typeof cantHuespedes != 'number' || !isValidObjectId(idHuespedReservador) || !isValidObjectId(idAlojamiento)) {
                throw new ValidacionInvalida('Los datos del huesped reservador, la cantidad de huespedes y el codigo del alojamiento son necesarios')
            }

            if(isNaN(rangoDefechas.fechaInicio) || isNaN(rangoDefechas.fechaFin)) {
                throw new ValidacionInvalida('Tanto la fecha de inicio como la fecha de finalizacion de la reserva deben ser fechas que deben estar en el formato aaaa-mm-dd')
            }
            const reservaNueva = await this.reservaService.crearReserva(rangoDefechas, idAlojamiento, idHuespedReservador, cantHuespedes)
            res.status(201).json(aReservaRest(reservaNueva))
            
        } catch (error) {
            if(!error.status) {
                console.log(error)
                res.status(500).json({error: "Error en el servidor"})
            } else {
                res.status(error.status).json({error: error.message, tipoError: error.nombreError})
            }
        } 
    }
    async modificarReserva(req, res){
        try {
            const idReserva = req.params.id
            const cantHuespedes = req.body.cantHuespedes

            if( !isValidObjectId(idReserva)) {
                throw new ValidacionInvalida('El ID de reserva no es valido')
            }
            if( cantHuespedes && typeof cantHuespedes != 'number' ) {
                throw new ValidacionInvalida('La cantidad de Huespedes debe ser un entero')
            }
            const rangoDefechas = { fechaInicio: new Date(req.body.fechaInicio), fechaFin: new Date(req.body.fechaFin) }
            if(isNaN(rangoDefechas.fechaInicio) || isNaN(rangoDefechas.fechaFin)) {
                throw new ValidacionInvalida('Tanto la fecha de inicio como la fecha de finalizacion de la reserva deben ser fechas que deben estar en el formato aaaa-mm-dd')
            }
            const reservaModificada = await this.reservaService.modificarReserva(idReserva, rangoDefechas, cantHuespedes)
            res.status(200).json(aReservaRest(reservaModificada))
        }catch (error) {
            if(!error.status) {
                console.log(error)
                res.status(500).json({error: "Error en el servidor"})
            } else {
                res.status(error.status).json({error: error.message, tipoError: error.nombreError})
            }
        }
    }
    async cancelarReserva(req, res){
        try {
            const id = req.params.id
            const motivo = req.body.motivo
            if(!motivo){
                motivo = ""
            }
            if(!isValidObjectId(id)){
                throw new ValidacionInvalida('el id no es valido')
            }
            const reservaCancelada = await this.reservaService.cancelar(id, motivo)
            res.json(aReservaRest(reservaCancelada));
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