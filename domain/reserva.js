import { Estado } from "./enums/estado_reserva"
class Reserva {
    fechaAlta
    huespedReservador
    cantHuespedes
    alojamiento
    rangoFechas
    estado

    constructor(fechaAlta, huespedReservador, cantHuespedes, alojamiento, rangoFechas) {
        this.fechaAlta = fechaAlta
        this.huespedReservador = huespedReservador
        this.alojamiento = alojamiento
        this.cantHuespedes = cantHuespedes
        this.rangoFechas = rangoFechas
        this.estado = Estado.PENDIENTE
    }

}