import { Reserva } from "../domain/reserva";
import { HuespedService } from "./huespedService";
import { AlojamientoService } from "./alojamientoService"
import { ReservaRepository } from "../repositories/reservaRepository";

export class ReservaService {

    async cancelar(id, motivo){
        reservaMongo = await ReservaRepository.findReservaId(id)
        if (!reservaMongo) {
            console.log("id no encontrado") //cambiar (tiene que tirar error)
        }
        const reserva = this.crearReserva(parametrosReserva(reservaMongo))
        reserva.cancelarReserva(motivo)
        return this.guardarReserva(reserva, reservaMongo) //paso la segunda para obtener el ID
    }

    async eliminarReserva(id){
        const deleted = await ReservaRepository.eliminarReserva(id)
    }

    async parametrosReserva(reservaMongo){
        huesped = reservaMongo.huesped
        alojamiento = reservaMongo.alojamiento
        return {
            huespedReservador: HuespedService.crearHuesped(huesped), 
            cantHuespedes: reservaMongo.cantHuespedes,
            alojamiento: AlojamientoService.crearAlojamiento(alojamiento), //TODO: creates de los otros Services
            rangoFechas: reservaMongo.reservaFechas
        }
    }

    async guardarReserva(reserva, reservaMongo){
        AlojamientoService.guardarAlojamiento(reserva.alojamiento, reservaMongo.alojamiento._id)
        HuespedService.guardarHuesped(reserva.huespedReservador, reservaMongo.huespedReservador._id)
        return await ReservaRepository.guardarReserva(this.reservaADoc(reserva, reservaMongo)) //TODO: saves de los otros Services
    }

    crearReserva(params){
        return new Reserva(params.huespedReservador, params.cantHuespedes, params.alojamiento, params.rangoFechas)
    }

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