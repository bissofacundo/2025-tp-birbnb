import { reservaModel } from "./schemas/reserva_schema.js"

const aDB = (reserva) => {
    const reservaDB = {
        ...reserva,
        fechaInicio: reserva.getFechaInicio(),
        fechaFin: reserva.getFechaFin(),
    }
    delete reservaDB.rangoFechas
    reservaDB.alojamiento = reserva.alojamiento.id
    reservaDB.huespedReservador = reserva.huespedReservador.id
    return reservaDB
}

export class ReservaRepository {
    reservaModel

    constructor() {
        this.reservaModel = reservaModel
    }

    async save(reserva) {
        const nuevaReserva = this.reservaModel(aDB(reserva))
        const reservaGuardada = await nuevaReserva.save()
        reserva.id = reservaGuardada.id
        return reserva
    }
}