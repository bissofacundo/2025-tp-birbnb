import { Estado } from "./enums/estado_reserva.js"
import { Notificacion } from "./notificacion.js"

export class FactoryNotificacion {

    crearSegunReserva(unaReserva) {
        let usuario = unaReserva.getAnfitrion()
        let mensaje = ""
        if (unaReserva.estado === Estado.PENDIENTE) {
            mensaje = "Hola Anfitrion, el usuario " + unaReserva.getNombreHuespedReservador() + " en "+ unaReserva.getNombreAlojamiento() 
                + " para el dia " + unaReserva.getFechaInicio() + " durante " + unaReserva.getCantidadDias() + " dia/s"
        }
        else if (unaReserva.estado === Estado.CONFIRMADA) {
            usuario = unaReserva.huespedReservador
            mensaje = "La reserva fue confirmada por el Anfitrion " + unaReserva.getNombreAnfitrion()
        }
        return new Notificacion(usuario, mensaje)
    }

}