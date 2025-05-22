import { NotificacionModelo } from "../schemas/notificacion_schema";

export const NotificacionRepository = {

    async guardarNotificacion(notificacion){
        const query = notificacion.id ? { _id: reserva.id } : { _id: new NotificacionModelo()._id }
        return await NotificacionModelo.findOneAndUpdate(
            query,
            notificacion,
            { 
                new: true, 
                runValidators: true,
                upsert: true
            }
        ).populate('huespedReservador').populate('alojamiento');
    }
}