import { ReservaRepository } from "../repositories/reservaRepository.js"
import { NotificationController } from "./notificationController.js"
import { NotificacionRepository } from "../repositories/notificacionRepository.js"

export const reservaController = {
    crearReserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas) {
        mensaje = ""
        nuevaReserva = new Reserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas)
        notificacion = NotificationController.crearNoti(nuevaReserva, mensaje)
        NotificacionRepository.guardarNotificacion(notificacion)
        ReservaRepository.agregarReserva(nuevaReserva)
        return nuevaReserva
    },
}