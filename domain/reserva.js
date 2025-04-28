import { Estado } from "./enums/estado_reserva.js"
import { FactoryNotificacion } from "./factory_notificacion.js"
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
        this.factoryNotificacion = new FactoryNotificacion()
        this.notificaciones = [this.factoryNotificacion.crearSegunReserva(this)]
    }

    actualizarEstado(estado) {
        this.estado = estado
        notificacion = this.factoryNotificacion.crearSegunReserva(this)
        this.notificaciones.push(notificacion)
        //No se si mandar al usuario o no
    }

}