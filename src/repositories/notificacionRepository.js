import { NotificacionModel } from "./schemas/notificacionSchema.js";

export class NotificacionRepository {
    model
    // notificaciones: [],
    constructor() {
        this.model = NotificacionModel;
    }

    async guardarNotificacion(notificacion) {
        const nuevaNotificacion = new this.model(notificacion);
        const notificacionGuardada = await nuevaNotificacion.save();

        return notificacionGuardada;
    }
}