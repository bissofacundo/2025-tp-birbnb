//agregar import de ENUMS

import { ReservaModelo } from "../schemas/reserva_schema.js"

export const ReservaRepository = {

    cambiarEstado(id, estado){ //TODO: checkear que el ENUM y el id existan
        reservaElegida = this.findReservaId(id)
        reservaElegida.actualizarEstado(estado)
        return reservaElegida
    },

    agregarReserva(nuevaReserva){
        this.reservas.push(nuevaReserva)
    },

    async findReservaId(id){
        return await ReservaModelo.findById(id).populate('huespedReservador').populate('alojamiento')
    },

    async eliminarReserva(id){
        const resultado = await ReservaModelo.findByIdAndDelete(id)
        return resultado !== null;
    },

    async guardarReserva(reserva) {
        const query = reserva.id ? { _id: reserva.id } : { _id: new ReservaModelo()._id }
        return await ReservaModelo.findOneAndUpdate(
            query,
            reserva,
            { 
                new: true, 
                runValidators: true,
                upsert: true
            }
        ).populate('huespedReservador').populate('alojamiento');
    }

}