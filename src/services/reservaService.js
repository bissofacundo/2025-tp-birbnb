import { RangoFechas } from "../domain/rangoFechas.js"
import { ReservaInvalida } from "../exceptions/alojamiento.js"
import { Reserva } from "../domain/reserva.js"
import { EntidadNoEncontrada } from "../exceptions/busquedaEntidad.js"
import { Alojamiento } from "../domain/alojamiento.js"
import {FactoryNotificacion} from "../domain/factoryNotificacion.js"

export class ReservaService {
    reservaRepository
    alojamientoRepository
    usuarioRepository
    notificacionRepository

    constructor(reservaRepository, alojamientoRepository, usuarioRepository, notificacionRepository) {
        this.reservaRepository = reservaRepository
        this.alojamientoRepository = alojamientoRepository
        this.usuarioRepository = usuarioRepository
        this.notificacionRepository = notificacionRepository
    }

    async crearReserva(rangoDefechas, idAlojamiento, idHuespedReservador, cantHuespedes) {
        const rangoFechas = new RangoFechas(rangoDefechas.fechaInicio, rangoDefechas.fechaFin)
        
        const alojamiento = await this.alojamientoRepository.findById(idAlojamiento)
        if(!alojamiento){
            throw new EntidadNoEncontrada(`No se encontro el alojamiento con el identificador ${idAlojamiento}`)
        }
        const huespedReservador = await this.usuarioRepository.findById(idHuespedReservador)
        if(!huespedReservador){
            throw new EntidadNoEncontrada(`No se encontro el usuario con el identificador ${idHuespedReservador}`)
        }
        if(!alojamiento.estaDisponibleEn(rangoFechas)) {
            throw new ReservaInvalida(`El rango de fechas para reservar el alojamiento ${alojamiento.nombre} no esta disponible entre las fechas ${rangoFechas.fechaInicio} y ${rangoFechas.fechaFin}`)
        }
        if(!alojamiento.puedenAlojarse(cantHuespedes)) {
            throw new ReservaInvalida(`La reserva supero la maxima cantidad de huespedes que el alojamiento ${alojamiento.nombre} permite. La maxima cantidad de huespedes que admite el alojamiento es ${alojamiento.cantHuespedesMax}`)
        }

        const reservaNueva = new Reserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas)

        const reservaGuardada = await this.reservaRepository.crearReserva(reservaNueva)

        alojamiento.agregarReserva(reservaGuardada)
        this.alojamientoRepository.actualizarAlojamiento(alojamiento)
        
        const notificacion = FactoryNotificacion.crearSegunReserva(reservaNueva)
        this.notificacionRepository.guardarNotificacion(notificacion);
        return reservaGuardada
    }


}