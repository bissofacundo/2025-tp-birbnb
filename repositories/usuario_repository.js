import { UsuarioModelo } from "../schemas/usuario_schema.js";
import { ReservaModelo } from "../schemas/reserva_schema.js";

export const UsuarioRepository = {

    async agaregarNotificacion(usuarioId, notificacionId){
        return await UsuarioModelo.findByIdAndUpdate(usuarioId,
            {$push: {notificaciones: notificacionId}},
            {new: true}
        )
    },

    async obtenerReservas(id) {
        return await ReservaModelo.find({ huespedReservador: id }, 'alojamiento rangoFechas estado').populate('alojamiento');
    }
}