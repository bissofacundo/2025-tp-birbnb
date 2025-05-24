import { Estado } from "./enums/estadoReserva.js"
import { Notificacion } from "./notificacion.js"

export const FactoryNotificacion = {
    
    crearSegunReserva(unaReserva) {
        let usuario = unaReserva.getAnfitrion()
        let mensaje = ""
        if (unaReserva.estado === Estado.PENDIENTE) {
            mensaje = "Hola Anfitrion, el usuario " + unaReserva.getNombreHuespedReservador() + " en "+ unaReserva.getNombreAlojamiento() 
                + " para el dia " + unaReserva.getFechaInicio() + " durante " + unaReserva.getCantidadDias() + " dia/s"
        }
        else if (unaReserva.estado === Estado.CONFIRMADA) {
            usuario = unaReserva.getHuespedReservador()
            mensaje = "La reserva fue confirmada por el Anfitrion " + unaReserva.getNombreAnfitrion()
        }
        else if (unaReserva.estado === Estado.CANCELADA) {
            usuario = unaReserva.getAnfitrion()
            mensaje = "No se fue dado un motivo"
        }
        
        return new Notificacion(usuario, mensaje)
    }

}