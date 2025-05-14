import { RangoFechas } from "../domain/rango_fechas.js"
import { ReservaInvalida } from "../exceptions/alojamiento.js"
import { Reserva } from "../domain/reserva.js"

export class ReservaService {
    reservaRepository
    alojamientoRepository
    usuarioRepository

    constructor(reservaRepository, alojamientoRepository, usuarioRepository) {
        this.reservaRepository = reservaRepository
        this.alojamientoRepository = alojamientoRepository
        this.usuarioRepository = usuarioRepository
    }

    async crearReserva(rangoDefechas, idAlojamiento, idHuespedReservador, cantHuespedes) {
        const rangoFechas = new RangoFechas(rangoDefechas.fechaInicio, rangoDefechas.fin)
        const alojamiento = await this.alojamientoRepository.findById(idAlojamiento)
        const huespedReservador = await this.usuarioRepository.findById(idHuespedReservador)
        
        if(!alojamiento.estaDisponibleEn(rangoFechas) || !alojamiento.puedenAlojarse(cantHuespedes) ) {
            throw new ReservaInvalida(`algo`)
        }

        const reservaNueva = new Reserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas)
        return this.reservaRepository.save(reservaNueva)
    }

}