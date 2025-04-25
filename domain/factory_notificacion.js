import { Notificacion } from "./notificacion"

export class FactoryNotificacion {

    crearSegunReserva(unaReserva) {
        return new Notificacion(unaReserva.usuarioSegunEstado(), 
            unaReserva.mensajeNotificacionSegunEstado())
    }
}