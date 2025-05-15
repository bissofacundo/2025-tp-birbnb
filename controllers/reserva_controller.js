
const aReservaRest = (reserva) => {
    return {
        id: reserva.id,
        huespedReservador: reserva.getNombreHuespedReservador(),
        alojamiento: reserva.getNombreAlojamiento(),
        fechaInicio: reserva.getFechaInicio(),
        fechaFin: reserva.getFechaFin(),
        estado: reserva.estado.toString()
    }
}

export class ReservaController {
    reservaService
    constructor(reservaService) {
        this.reservaService = reservaService
    }

    async crearReserva(req, res) {
        try {
            const rangoDefechas = { fechaInicio: req.body.fechaInicio, 
                                  fechaFin: req.body.fechaFin}
            const idAlojamiento = parseInt(req.body.alojamiento)
            const idHuespedReservador = parseInt(req.body.huespedReservador)
            const cantHuespedes = parseInt(req.body.cantHuespedes)
            const reservaNueva = await this.reservaService.crearReserva(rangoDefechas, idAlojamiento, idHuespedReservador, cantHuespedes)
            res.status(201).json(aReservaRest(reservaNueva))
        } catch (error) {
            res.status(400).json({error: error.message})
        } 
    }
}