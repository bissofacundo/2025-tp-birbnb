import { ValidacionInvalida } from "../exceptions/datosInvalidos.js"

const aReservaRest = (reserva) => {
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
            
            if(typeof cantHuespedes != 'number' || !idHuespedReservador || !idAlojamiento) {
                throw new ValidacionInvalida('Los datos del huesped reservador, la cantidad de huespedes y el codigo del alojamiento son necesarios y deben ser numericos')
            }

            if(isNaN(rangoDefechas.fechaInicio) || isNaN(rangoDefechas.fechaFin)) {
                throw new ValidacionInvalida('Tanto la fecha de inicio como la fecha de finalizacion de la reserva deben ser fechas que deben estar en el formato aaaa-mm-dd')
            }
            const reservaNueva = await this.reservaService.crearReserva(rangoDefechas, idAlojamiento, idHuespedReservador, cantHuespedes)
            // res.status(201).json(aReservaRest(reservaNueva))
            res.status(201).json(reservaNueva)
            
        } catch (error) {
            if(!error.status) {
                res.status(500).json({error: "Error en el servidor"})
            } else {
                res.status(error.status).json({error: error.message, tipoError: error.nombreError})
            }
            // if( error instanceof EntidadNoEncontrada){
                // res.status(400).json({
                //     error: error.message,
                //   })
            // }
        } 
    }
    async modificarReserva(req, res){
        try {
            const idReserva = req.body.reserva
            const idAlojamiento = req.body.alojamiento
            const idHuespedReservador = req.body.huespedReservador
            const cantHuespedes = req.body.cantHuespedes

            if( typeof idReserva != 'number' ||
                typeof idAlojamiento != 'number'  || 
                typeof idHuespedReservador != 'number'  || 
                typeof cantHuespedes != 'number' ) {
                throw new ValidacionInvalida('Los ID de reserva, alojamiento y reservador y la cantidad de huespedes son obligatorios y deben ser enteros')
            }

            // Primero valido que me hayan pasado algo, porque si no el new Date explota
            if( !req.body.fechaInicio || !req.body.fechaFin){
                throw new ValidacionInvalida('Los campos fechaInicio y fechaFin son obligatorios')
            }
            const rangoDefechas = { fechaInicio: new Date(req.body.fechaInicio), fechaFin: new Date(req.body.fechaFin) }
            if(isNaN(rangoDefechas.fechaInicio) || isNaN(rangoDefechas.fechaFin)) {
                throw new ValidacionInvalida('Tanto la fecha de inicio como la fecha de finalizacion de la reserva deben ser fechas que deben estar en el formato aaaa-mm-dd')
            }
            const reservaModificada = await this.reservaService.modificarReserva(rangoDefechas, idAlojamiento, idHuespedReservador, cantHuespedes)
            res.status(200).json(aReservaRest(reservaModificada))
        } catch (error) {
            if(!error.status) {
                res.status(500).json({error: "Error en el servidor"})
            } else {
                res.status(error.status).json({error: error.message, tipoError: error.nombreError})
            }
        } 
    }
}