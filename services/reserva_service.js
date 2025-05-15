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
        const rangoFechas = new RangoFechas(rangoDefechas.fechaInicio, rangoDefechas.fechaFin)
        const alojamiento = await this.alojamientoRepository.findById(idAlojamiento)
        const huespedReservador = await this.usuarioRepository.findById(idHuespedReservador)
        
        const reservaNueva = new Reserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas)

        if(!alojamiento.estaDisponibleEn(rangoFechas)) {
            throw new ReservaInvalida(`El rango de fechas para reservar el alojamiento ${alojamiento.nombre} no esta disponible entre las fechas ${rangoFechas.fechaInicio} y ${rangoFechas.fechaFin}`)
        }
        if(!alojamiento.puedenAlojarse(cantHuespedes)) {
            throw new ReservaInvalida(`La reserva supero la maxima cantidad de huespedes que el alojamiento ${alojamiento.nombre} permite. La maxima cantidad de huespedes que admite el alojamiento es ${alojamiento.cantHuespedesMax}`)
        }
        
        return this.reservaRepository.save(reservaNueva)
    }

}