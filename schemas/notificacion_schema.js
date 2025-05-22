import mongoose from "mongoose"
import { Notificacion } from "../domain/notificacion"

const notificacionSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    mensaje:{
        type: String,
        required: true
    },
    fechaAlta:{
        type: Date,
        required: true,
    },
    leida: {
        type: Boolean,
        required: true
    },
    fechaLeida: {
        type: Date,
        requiered: true
    }
}, {
    collection: 'notificaciones'
})


notificacionSchema.loadClass(Notificacion)

export const NotificacionModelo = mongoose.model('Notificacion', notificacionSchema)