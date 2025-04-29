import { ReservaRepository } from "../repositories/reservaRepository"
import { NotificationController } from "./notificationController"

export const reservaController = {
    crearReserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas){
        fechaAlta = new Date()
        mensaje = ""
        nuevaReserva = new Reserva(fechaAlta, huespedReservador, cantHuespedes, alojamiento, rangoFechas)
        NotificationController.crearNoti(nuevaReserva,mensaje)
        ReservaRepository.agregarReserva(nuevaReserva)
        return nuevaReserva
        },
}