import { ReservaRepository } from "../repositories/reservaRepository.js"
import { NotificationController } from "./notificationController.js"
import { NotificacionRepository } from "../repositories/notificacion_repository.js"
import { ReservaService } from "../services/reservaService.js"

export const reservaController = {

    crearReserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas) {
        mensaje = ""
        nuevaReserva = new Reserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas)
        notificacion = NotificationController.crearNoti(nuevaReserva, mensaje)
        NotificacionRepository.guardarNotificacion(notificacion)
        ReservaRepository.agregarReserva(nuevaReserva)
        return nuevaReserva
    },

    async cancelarReserva(req, res){
        try {
            await ReservaService.cancelar(req.params.id, req.motivo)
            res.status(200).send();
        } catch (error) {
            console.log("error!") //cambiar
        }
    }
}