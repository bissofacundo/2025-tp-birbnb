import mongoose from "mongoose"
import { Reserva } from "../../domain/reserva.js"
import { RangoFechas } from "../../domain/rangoFechas.js"
import { CambioEstadoReserva } from "../../domain/cambioEstadoReserva.js"

const cambioEstadoReservaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    estadoReserva: {
        type: String,
        required: true
    },
    motivo: {
        type: String,
        trim: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, {
    _id: false
})

const rangoFechasSchema = new mongoose.Schema({
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    }
}, {
    _id: false
})

const reservaSchema = new mongoose.Schema({
    fechaAlta: {
        type: Date,
        required: true
    },
    rangoFechas: {
        type: rangoFechasSchema,
        required: true
    },
    huespedReservador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    cantHuespedes: {
        type: mongoose.Schema.Types.Int32,
        required: true
    },
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Alojamiento'
    },
    estado: {
        type: String,
        required: true
    },
    precioPorNoche: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    cambiosEstadoReserva: [cambioEstadoReservaSchema]
}, {
    collection: 'reservas'
})
rangoFechasSchema.loadClass(RangoFechas)
cambioEstadoReservaSchema.loadClass(CambioEstadoReserva)
reservaSchema.loadClass(Reserva)

reservaSchema.loadClass(Reserva)
export const reservaModel = mongoose.model('Reserva', reservaSchema)
