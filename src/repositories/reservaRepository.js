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