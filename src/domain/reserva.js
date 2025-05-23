import { ReservaInvalida } from "../exceptions/alojamiento.js"
import { Estado } from "./enums/estado_reserva.js"
import { FactoryNotificacion } from "./factory_notificacion.js"
import { CambioEstadoReserva } from "./cambio_estado_reserva.js"
export class Reserva {
    fechaAlta
    huespedReservador
    cantHuespedes
    alojamiento
    rangoFechas
    estado
    precioPorNoche
    cambiosEstadoReserva

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
        this.cambiosEstadoReserva = []
        // const notificacion =  this.actualizarEstadoConNotificacion(Estado.PENDIENTE, "Creacion Reserva")
        // this.getAnfitrion().guardarNotificacion(notificacion)
    }

    validarParametros(cantHuespedes) {
        if(!cantHuespedes || isNaN(cantHuespedes) || cantHuespedes <= 1 ) {
            throw new ReservaInvalida(`La cantidad de huespedes debe ser mayor a cero, se recibió: ${cantHuespedes}`)
        }
            
    }

    actualizarEstado(estado) {
        this.estado = estado
    }

    //Requerimiento 2
    aceptarReserva() {
        const notificacion = this.actualizarEstadoConNotificacion(Estado.CONFIRMADA, "Se acepto la reserva")
        this.huespedReservador.guardarNotificacion(notificacion)
    }

    actualizarEstadoConNotificacion(estado, motivo) {
        this.actualizarEstado(estado)
        const cambioRegistrado =  new CambioEstadoReserva(new Date(), this.estado, motivo, this.huespedReservador)
        this.cambiosEstadoReserva.push(cambioRegistrado)
        return FactoryNotificacion.crearSegunReserva(this)
    }

    //Requerimiento 3
    cancelarReserva(motivo){
        const notificacion = this.actualizarEstadoConNotificacion(Estado.CANCELADA, "El huesped ha cancelado la reserva por " + motivo)
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

    getFechaFin() {
        return this.rangoFechas.fechaFin.toString()
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
