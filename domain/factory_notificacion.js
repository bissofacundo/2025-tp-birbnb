import { Notificacion } from "./notificacion.js"

export class FactoryNotificacion {

    crearSegunReserva(unaReserva) {
        return new Notificacion(unaReserva.usuarioSegunEstado(), 
            unaReserva.mensajeNotificacionSegunEstado())
    }
}