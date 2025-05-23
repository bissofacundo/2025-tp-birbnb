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

    

    aReservaDB(reserva) {
        const reservaDB = {
            ...reserva,
            alojamiento: reserva.alojamiento.id,
            huespedReservador: reserva.huespedReservador.id,
            cambiosEstadoReserva: reserva.cambiosEstadoReserva.map(this.aCambioEstadoReservaDB.bind(this)),
            rangoFechas: {
                fechaInicio: reserva.getFechaInicio(),
                fechaFin: reserva.getFechaFin()
            }  
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
import { reservaModel } from "./schemas/reservaSchema.js"

const aDB = (reserva) => {
    const reservaDB = {
        ...reserva,
        alojamiento: reserva.alojamiento.id,
        huespedReservador: reserva.huespedReservador.id,
        cambiosEstadoReserva: reserva.cambiosEstadoReserva.map(aCambioEstadoReservaDB),
        fechaInicio: reserva.getFechaInicio(),
        fechaFin: reserva.getFechaFin(),
    }
    delete reservaDB.rangoFechas
    return reservaDB
}

const aCambioEstadoReservaDB = (cambioEstadoReserva) => {
    return {
        ...cambioEstadoReserva, 
        usuario: cambioEstadoReserva.usuario.id
    }
}

export class ReservaRepository {
    reservaModel

    constructor() {
        this.reservaModel = reservaModel
    }

    async crearReserva(reserva) {
        const nuevaReserva = this.reservaModel(aDB(reserva))
        const reservaGuardada = await nuevaReserva.save()
        reserva.id = reservaGuardada.id
        return reserva
    }

    async save(reserva){
        if(reserva.id){
            //Aca actualizo
            //findByIdAndUpdate
            //findByIdAndDelete
        } else {
            const nuevaReserva = this.reservaModel(aDB(reserva))
            const reservaGuardada = await nuevaReserva.save()
            reserva.id = reservaGuardada.id
            return reserva
        }
    }

    async findAll() {
        const nombre = "pepe"
        const reservas = await this.reservaModel.findOne({nombre})
        return reservas
    }
}