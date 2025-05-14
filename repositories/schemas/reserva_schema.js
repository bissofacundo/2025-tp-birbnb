import mongoose from "mongoose"

const reservaSchema = new mongoose.Schema({
    fechaAlta: {
        type: Date,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    huespedReservador:  {
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
    }
    }, {
        collection: 'reservas'
})

export const reservaModel = mongoose.Model('Reserva', reservaSchema)
