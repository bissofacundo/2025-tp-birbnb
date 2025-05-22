import { Reserva } from "../domain/reserva";
import { UsuarioService } from "./usuarioService";
import { AlojamientoService } from "./alojamiento_service"
import { ReservaRepository } from "../repositories/reserva_repository";

export const ReservaService = {

    async cancelar(id, motivo){
        reservaMongo = await ReservaRepository.findReservaId(id)
        if (!reservaMongo) {
            console.log("id no encontrado") //cambiar (tiene que tirar error)
        }
        const reserva = this.crearReserva(parametrosReserva(reservaMongo))
        notificacion = reserva.cancelarReserva(motivo) //esta notificacion no tiene el id, que es el id del anfitrion, asi que lo obtengo acá abajo
        notificacion.usuario = reservaMongo.alojamiento.anfitrion
        UsuarioService.guardarNotificacion(notificacion)
        return this.guardarReserva(reserva, reservaMongo) //paso la segunda para obtener el ID
    },

    async eliminarReserva(id){
        const deleted = await ReservaRepository.eliminarReserva(id)
    },

    async parametrosReserva(reservaMongo){
        usuario = reservaMongo.huespedReservador
        alojamiento = reservaMongo.alojamiento
        return {
            huespedReservador: UsuarioService.crearUsuario(usuario), 
            cantHuespedes: reservaMongo.cantHuespedes,
            alojamiento: AlojamientoService.crearAlojamiento(alojamiento), //TODO: creates de los otros Services
            rangoFechas: reservaMongo.reservaFechas
        }
    },

    async guardarReserva(reserva, reservaMongo){
        AlojamientoService.guardarAlojamiento(reserva.alojamiento, reservaMongo.alojamiento) //?
        UsuarioService.guardarUsuario(reserva.huespedReservador, reservaMongo.huespedReservador) //?
        return await ReservaRepository.guardarReserva(this.reservaADoc(reserva, reservaMongo)) //TODO: verificar si los otros saves van, si van hacerlos y sino borrar
    },

    crearReserva(params){
        return new Reserva(params.huespedReservador, params.cantHuespedes, params.alojamiento, params.rangoFechas)
    },

    reservaADoc(reserva, reservaMongo) {
        return {
            id: reservaMongo._id,
            fechaAlta: reserva.fechaAlta,
            huespedReservador: reservaMongo.huespedReservador._id,
            cantHuespedes: reserva.cantHuespedes,
            alojamiento: reservaMongo.alojamiento._id,
            rangoFechas: reserva.rangoFechas,
            estado: reserva.estado,
            precioPorNoche: reserva.precioPorNoche
        }

    }
}