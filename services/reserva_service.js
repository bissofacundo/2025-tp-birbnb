import { Reserva } from "../domain/reserva.js";
import { UsuarioService } from "./usuario_service.js";
import { AlojamientoService } from "./alojamiento_service.js"
import { ReservaRepository } from "../repositories/reserva_repository.js";
import { EntidadNoEncontrada } from "../exceptions/busqueda_entidad.js";
import { MismoEstado } from "../exceptions/mismo_estado.js";

export const ReservaService = {

    async cancelar(id, motivo){
        reservaMongo = await ReservaRepository.findReservaId(id)
        if (!reservaMongo) {
            throw new EntidadNoEncontrada(`No se encontro la reserva con el identificador ${id}`)
        }
        if(reservaMongo.estado.toUpperCase() === 'CANCELADA'){
            throw new MismoEstado('la reserva ya se encuentra cancelada')
        }
        //const reserva = this.crearReserva(parametrosReserva(reservaMongo))
        idAnfitrion = reservaMongo.getAnfitrion().id
        notificacion = reservaMongo.cancelarReserva(motivo) //esta notificacion no tiene el id, que es el id del anfitrion, asi que lo obtengo acá abajo
        //notificacion.usuario = reservaMongo.alojamiento.anfitrion
        UsuarioService.guardarNotificacion(idAnfitrion, notificacion)
        /*reservaMongo.cancelarReserva(motivo)
        return await ReservaRepository.guardarReserva(this.reservaADoc(reservaMongo))*/
        //return this.guardarReserva(reserva, reservaMongo) //paso la segunda para obtener el ID
        return this.guardarReserva(reservaMongo)
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

    async guardarReserva(reservaMongo){
        AlojamientoService.guardarAlojamiento(reservaMongo.alojamiento) //?
        UsuarioService.guardarUsuario(reservaMongo.huespedReservador) //?
        return await ReservaRepository.guardarReserva(this.reservaADoc(reservaMongo)) //TODO: verificar si los otros saves van, si van hacerlos y sino borrar
    },

    crearReserva(params){
        return new Reserva(params.huespedReservador, params.cantHuespedes, params.alojamiento, params.rangoFechas)
    },

    /*reservaADoc(reserva, reservaMongo) {
        return {
            id: reservaMongo.id,
            fechaAlta: reserva.fechaAlta,
            huespedReservador: reservaMongo.huespedReservador.id,
            cantHuespedes: reserva.cantHuespedes,
            alojamiento: reservaMongo.alojamiento.id,
            rangoFechas: reserva.rangoFechas,
            estado: reserva.estado,
            precioPorNoche: reserva.precioPorNoche
        }

    }*/

    reservaADoc(reservaMongo) {
        return {
            id: reservaMongo.id,
            fechaAlta: reservaMongo.fechaAlta,
            huespedReservador: reservaMongo.huespedReservador.id,
            cantHuespedes: reservaMongo.cantHuespedes,
            alojamiento: reservaMongo.alojamiento.id,
            rangoFechas: reservaMongo.rangoFechas,
            estado: reservaMongo.estado,
            precioPorNoche: reservaMongo.precioPorNoche
        }

    }
}