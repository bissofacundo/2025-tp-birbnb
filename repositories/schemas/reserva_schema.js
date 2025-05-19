import mongoose from "mongoose"

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
})

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
    },
    cambiosEstadoReserva: [cambioEstadoReservaSchema]
    }, {
        collection: 'reservas'
})

export const reservaModel = mongoose.model('Reserva', reservaSchema)
