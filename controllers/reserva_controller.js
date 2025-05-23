import { ReservaRepository } from "../repositories/reserva_repository.js"
import { NotificationController } from "./notificationController.js"
import { NotificacionRepository } from "../repositories/notificacion_repository.js"
import { ReservaService } from "../services/reserva_service.js"
import { ValidacionInvalida } from "../exceptions/datos_invalidos.js"

export const ReservaController = {

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
            id = req.params.id
            motivo = req.body.motivo
            if(!motivo || motivo === ""){
                throw new ValidacionInvalida('Se debe elaborar un motivo de cancelacion')
            }
            if(typeof id !== 'number'){
                throw new ValidacionInvalida('el id debe ser un numero')
            }
            reservaCancelada = await ReservaService.cancelar(id, motivo)
            res.json(reservaCancelada);
        } catch (error) {
            if(!error.status) {
                res.status(500).json({error: "Error en el servidor"})
            } else {
                res.status(error.status).json({error: error.message, tipoError: error.nombreError})
            }
        }
    }
}