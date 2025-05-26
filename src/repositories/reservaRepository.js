import { CambioEstadoReserva } from "../domain/cambioEstadoReserva.js"
import { Estado } from "../domain/enums/estadoReserva.js"
import { RangoFechas } from "../domain/rangoFechas.js"
import { reservaModel } from "./schemas/reservaSchema.js"
import { Reserva } from "../domain/reserva.js"


export class ReservaRepository {
    reservaModel
    alojamientoRepository
    usuarioRepository

    constructor(usuarioRepository) {
        this.reservaModel = reservaModel
        this.usuarioRepository = usuarioRepository
    }

    async findReservaId(id){
        const reserva = await this.reservaModel.findById(id)
        const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento)
        return this.deReservaDB(reserva, alojamiento)
    }

    aReservaDB(reserva) {
        const reservaDB = {
            ...reserva,
            alojamiento: reserva.alojamiento.id,
            huespedReservador: reserva.huespedReservador.id,
            cambiosEstadoReserva: reserva.cambiosEstadoReserva.map(this.aCambioEstadoReservaDB.bind(this)),
            rangoFechas: {
                fechaInicio: reserva.getFechaInicio(),
                fechaFin: reserva.getFechaFin()
            },
            estado: reserva.estado.toString()  
        }
        return reservaDB
    }

    aCambioEstadoReservaDB(cambioEstadoReserva) {
        return {
            ...cambioEstadoReserva, 
            usuario: cambioEstadoReserva.usuario.id
        }
    }

    async deCambioEstadoReservaDB(cambioEstadoReservaDB) {
        const cambioEstadoReserva = new CambioEstadoReserva();
        Object.assign(cambioEstadoReserva, {
            fecha: cambioEstadoReservaDB.fecha,
            estadoReserva: Estado.fromString(cambioEstadoReservaDB.estadoReserva), 
            motivo: cambioEstadoReserva.motivo,
            usuario: await this.usuarioRepository.findById(cambioEstadoReservaDB.usuario)
        })
        return cambioEstadoReserva;
    }

    async deReservaDB(reservaDB, alojamientoAgregado) {
        const reservaNueva = Reserva.build()
        const rangoFechas = new RangoFechas(reservaDB.rangoFechas.fechaInicio, reservaDB.rangoFechas.fechaFin)
        Object.assign(reservaNueva, {
            id: reservaDB.id,
            fechaAlta: reservaDB.fechaAlta,
            huespedReservador: await this.usuarioRepository.findById(reservaDB.huespedReservador),
            cantHuespedes: reservaDB.cantHuespedes,
            rangoFechas: rangoFechas,
            estado: Estado.fromString(reservaDB.estado),
            precioPorNoche: reservaDB.precioPorNoche,
            cambiosEstadoReserva: await Promise.all(reservaDB.cambiosEstadoReserva.map(this.deCambioEstadoReservaDB.bind(this))),
            alojamiento: alojamientoAgregado
        })
        return reservaNueva
    }

    async findByIdWithAlojamiento(id, alojamiento) {
        const reservaEncontrada = await this.reservaModel.findById(id);
        return this.deReservaDB(reservaEncontrada, alojamiento)
    }
    async crearReserva(reserva) {
        const nuevaReserva = this.reservaModel(this.aReservaDB(reserva))
        const reservaGuardada = await nuevaReserva.save()
        reserva.id = reservaGuardada.id
        return reserva
    }

    async save(reserva){
        if(reserva.id){

            await this.reservaModel.findByIdAndUpdate(reserva.id, this.aReservaDB(reserva))
            return reserva
        } else {
            const nuevaReserva = this.reservaModel(aDB(reserva))
            const reservaGuardada = await nuevaReserva.save()
            reserva.id = reservaGuardada.id
            return reserva
        }
    }
    async obtenerReservas(id) {
        return await this.reservaModel.find({ huespedReservador: id }).populate('alojamiento').populate('huespedReservador');
    }
}