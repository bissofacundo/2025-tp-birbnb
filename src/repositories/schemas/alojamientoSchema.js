import mongoose from "mongoose";

const alojamientoSchema = new mongoose.Schema({
    anfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    nombre: { type: String, required: true },

    descripcion: { type: String },

    precioPorNoche: { type: Number },

    moneda: { type: String },

    horarioCheckIn: { type: String },

    horarioCheckOut: { type: String },

    direccion: {
        calle : { type: String },
        altura : { type: Number },
        ciudad : { type: String },
        lat : { type: Number },
        long : { type: Number },
        pais : { type: String },
    },
    cantHuespedesMax: { type: Number },

    caracteristicas: [{ type: String }],
    reservas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reserva",
        required: true
    }],
    fotos: [{
        descripcion: { type: String },
        path: { type: String }
    }]
},
{
    collection : "Alojamientos"
}
);

export const AlojamientoModel = mongoose.model("Alojamiento", alojamientoSchema);
