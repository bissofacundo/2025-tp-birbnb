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
// import { NotificacionModelo } from "../schemas/notificacion_schema.js";

// export const NotificacionRepository = {

//     async guardarNotificacion(notificacion){
//         const query = notificacion.id ? { _id: reserva.id } : { _id: new NotificacionModelo()._id }
//         return await NotificacionModelo.findOneAndUpdate(
//             query,
//             notificacion,
//             { 
//                 new: true, 
//                 runValidators: true,
//                 upsert: true
//             }
//         ).populate('huespedReservador').populate('alojamiento');
//     }
// }
