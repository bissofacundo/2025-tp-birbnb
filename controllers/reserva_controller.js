import { ValidacionInvalida } from "../exceptions/datos_invalidos"

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

            if(typeof idAlojamiento != 'number'  || typeof idHuespedReservador != 'number'  || typeof cantHuespedes != 'number' ) {
                throw new ValidacionInvalida('Los datos del huesped reservador, la cantidad de huespedes y el codigo del alojamiento son necesarios y deben ser numericos')
            }

            if(isNaN(rangoDefechas.fechaInicio) || isNaN(rangoDefechas.fechaFin)) {
                throw new ValidacionInvalida('Tanto la fecha de inicio como la fecha de finalizacion de la reserva deben ser fechas que deben estar en el formato aaaa-mm-dd')
            }
            const reservaNueva = await this.reservaService.crearReserva(rangoDefechas, idAlojamiento, idHuespedReservador, cantHuespedes)
            res.status(201).json(aReservaRest(reservaNueva))
        } catch (error) {
            if(!error.status) {
                res.status(500).json({error: "Error en el servidor"})
            } else {
                res.status(error.status).json({error: error.message, tipoError: error.nombreError})
            }
        } 
    }
}