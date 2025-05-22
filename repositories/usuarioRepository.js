import { UsuarioModelo } from "../schemas/usuarioSchema";
import { ReservaModelo } from "../schemas/reservaSchema";

export const UsuarioRepository = {

    async obtenerReservas(id) {
        return await ReservaModelo.find({ huespedReservador: id }, 'alojamiento rangoFechas estado').populate('alojamiento');
    }
}