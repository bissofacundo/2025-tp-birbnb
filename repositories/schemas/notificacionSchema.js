import mongoose from "mongoose";
import { Notificacion } from "../../domain/notificacion.js";

const notificacionSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    fechaAlta: {
        type: Date,
        default: Date.now
    },
    leida: {
        type: Boolean,
        default: false
    },
    fechaLeida: {
        type: Date,
        default: null
    }
}, {
    collection: "notificaciones"
});

notificacionSchema.loadClass(Notificacion);

export const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);