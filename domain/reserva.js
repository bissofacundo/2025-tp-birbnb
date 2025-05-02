import { Estado } from "./enums/estado_reserva.js"
export class Reserva {
    fechaAlta
    huespedReservador
    cantHuespedes
    alojamiento
    rangoFechas
    estado
    precioPorNoche

    constructor(huespedReservador, cantHuespedes, alojamiento, rangoFechas) {
        this.fechaAlta = new Date();
        this.huespedReservador = huespedReservador
        this.alojamiento = alojamiento
        this.cantHuespedes = cantHuespedes
        this.rangoFechas = rangoFechas
        this.estado = Estado.PENDIENTE
        this.precioPorNoche = alojamiento.precioPorNoche
    }

    actualizarEstado(estado) {
        this.estado = estado
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
        return this.rangoFechas.cantidadDias.toString()
    }

    getNombreAnfitrion() {
        return this.alojamiento.getAnfitrion().nombre
    }

    getAnfitrion() {
        return this.alojamiento.getAnfitrion()
    }

    teSuperponesCon(rangoFechas){
        return this.rangoFechas.tieneInterseccionCon(rangoFechas)
    }
}