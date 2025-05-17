import { DatoErroneoException, DatoFaltanteException } from "../exceptions/datos_invalidos"

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

            if(!idAlojamiento || !idHuespedReservador || !cantHuespedes) {
                throw new DatoFaltanteException('Hacen falta datos para crear la reserva. Se debe indicar el alojamiento, la cantidad de huespedes y el usuario que hace la reservacion')
            }

            if(isNaN(rangoDefechas.fechaInicio) || isNaN(rangoDefechas.fechaFin)) {
                throw new DatoErroneoException('Tanto la fecha de inicio como la fecha de finalizacion de la reserva deben ser fechas deben estar en el formato aaaa-mm-dd')
            }
            const reservaNueva = await this.reservaService.crearReserva(rangoDefechas, idAlojamiento, idHuespedReservador, cantHuespedes)
            res.status(201).json(aReservaRest(reservaNueva))
        } catch (error) {
            res.status(400).json({error: error.message})
        } 
    }
}