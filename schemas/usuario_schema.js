import mongoose from "mongoose"
import { Usuario } from "../domain/usuario.js"

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    tipoUsuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'TipoDeUsuario'
    },
    notificaciones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notificacion',
        required: true
    }]
}, {
    collection: 'usuarios'
})


usuarioSchema.loadClass(Usuario)

export const UsuarioModelo = mongoose.model('Usuario', usuarioSchema)