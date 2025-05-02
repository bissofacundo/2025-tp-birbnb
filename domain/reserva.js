import { ReservaInvalida } from "../exceptions/alojamiento.js"
import { Estado } from "./enums/estado_reserva.js"
import { FactoryNotificacion } from "./factory_notificacion.js"
import { RangoFechas } from "./rango_fechas.js"
export class Reserva {
    fechaAlta
    huespedReservador
    cantHuespedes
    alojamiento
    rangoFechas
    estado
    precioPorNoche

    //Requerimiento 1
    constructor(huespedReservador, cantHuespedes, alojamiento, rangoFechas) {
        this.validarParametros(cantHuespedes)
        this.fechaAlta = new Date();
        this.huespedReservador = huespedReservador
        this.alojamiento = alojamiento
        this.cantHuespedes = cantHuespedes
        this.rangoFechas = rangoFechas
        this.estado = Estado.PENDIENTE
        this.precioPorNoche = alojamiento.precioPorNoche
        notificacion = FactoryNotificacion.crearSegunReserva(this)
        this.getAnfitrion().guardarNotificacion(notificacion)
    }

    validarParametros(cantHuespedes) {
        if(!cantHuespedes || isNaN(cantHuespedes) || cantHuespedes <= 0 ) {
            throw new ReservaInvalida(`La cantidad de huespedes debe ser mayor a cero, se recibió: ${cantHuespedes}`)
        }
            
    }

    actualizarEstado(estado) {
        this.estado = estado
    }

    //Requerimiento 2
    aceptarReserva() {
        notificacion = this.crearNotificacionPorCambioA(Estado.CONFIRMADA)
        this.huespedReservador.guardarNotificacion(notificacion)
    }

    crearNotificacionPorCambioA(estado) {
        reserva.actualizarEstado(estado)
        return FactoryNotificacion.crearSegunReserva(reserva)
    }

    //Requerimiento 3
    cancelarReserva(motivo){
        notificacion = this.crearNotificacionPorCambioA(Estado.CANCELADA)
        notificacion.aniadirMotivo(motivo)
        this.getAnfitrion().guardarNotificacion(notificacion)
    }

    getNombreAlojamiento() {
        return this.alojamiento.nombre
    }

    getNombreHuespedReservador() {
        return this.huespedReservador.nombre
    }

    getHuespedReservador() {
        return this.huespedReservador
    }

    getFechaInicio() {
        return this.rangoFechas.fechaInicio.toString()
    }

    getCantidadDias() {
        return this.rangoFechas.cantidadDias().toString()
    }

    getNombreAnfitrion() {
        return this.getAnfitrion().nombre
    }

    getAnfitrion() {
        return this.alojamiento.getAnfitrion()
    }

    teSuperponesCon(rangoFechas) {
        return this.rangoFechas.tieneInterseccionCon(rangoFechas)
    }
}