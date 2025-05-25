import { RangoFechas } from "../domain/rangoFechas.js"
import { ReservaInvalida } from "../exceptions/alojamiento.js"
import { Reserva } from "../domain/reserva.js"
import { EntidadNoEncontrada } from "../exceptions/busquedaEntidad.js"
import {FactoryNotificacion} from "../domain/factoryNotificacion.js"
import {MismoEstado} from "../exceptions/mismoEstado.js"
import { Estado } from "../domain/enums/estadoReserva.js"

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
    async cancelar(id, motivo){
        const reservaMongo = await this.reservaRepository.findReservaId(id)
        if (!reservaMongo) {
            throw new EntidadNoEncontrada(`No se encontro la reserva con el identificador ${id}`)
        }
        if(reservaMongo.estado === Estado.CANCELADA){
            throw new MismoEstado('la reserva ya se encuentra cancelada')
        }
        reservaMongo.cancelarReserva(motivo)
        const notificacion = FactoryNotificacion.crearSegunReserva(reservaMongo)
        notificacion.aniadirMotivo(motivo)
        this.notificacionRepository.guardarNotificacion(notificacion);
        return this.reservaRepository.save(reservaMongo)
    }

    async eliminarReserva(id){
        const deleted = await ReservaRepository.eliminarReserva(id)
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
    async modificarReserva(idReserva, rangoDefechas, cantHuespedes) {
        const rangoFechas = new RangoFechas(rangoDefechas.fechaInicio, rangoDefechas.fechaFin)
        
        const reserva = await this.reservaRepository.findReservaId(idReserva)
        if(!reserva){
            throw new EntidadNoEncontrada(`No se encontro la reserva con el identificador ${idReserva}`)
        }
        if(!reserva.alojamiento.estaDisponibleEn(rangoFechas)) {
            throw new ReservaInvalida(`El rango de fechas para reservar el alojamiento ${reserva.alojamiento.nombre} no esta disponible entre las fechas ${rangoFechas.fechaInicio} y ${rangoFechas.fechaFin}`)
        }
        if(!reserva.alojamiento.puedenAlojarse(cantHuespedes)) {
            throw new ReservaInvalida(`La reserva supero la maxima cantidad de huespedes que el alojamiento ${reserva.alojamiento.nombre} permite. La maxima cantidad de huespedes que admite el alojamiento es ${reserva.alojamiento.cantHuespedesMax}`)
        }
        reserva.rangoFechas = rangoFechas
        reserva.cantHuespedes = cantHuespedes
        return this.reservaRepository.save(reserva)
    }

}