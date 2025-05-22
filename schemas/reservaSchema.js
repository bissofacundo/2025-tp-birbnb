import mongoose from "mongoose"
import { Reserva } from "../domain/reserva"

const rangoFechasSchema = new mongoose.Schema({
    fechaInicio: Date,
    fechaFin: Date
})

const reservaSchema = new mongoose.Schema({
    fechaAlta:{
        type: Date,
        required: true
    },
    huespedReservador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Huesped',
        required: true
    },
    cantHuespedes:{
        type: Number,
        required: true
    },
    alojamiento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alojamiento',
        required: true
    },
    rangoFechas:{
        type: [rangoFechasSchema],
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    precioPorNoche:{
        type: Number,
        required: true
    },

}, {
    collection: 'reservas'
})


reservaSchema.loadClass(Reserva)

export const ReservaModelo = mongoose.model('Reserva', reservaSchema)