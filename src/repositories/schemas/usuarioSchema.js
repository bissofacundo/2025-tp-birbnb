import mongoose from "mongoose"
import { Usuario } from "../../domain/usuario.js"

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tipo: {
        type: mongoose.Schema.Types.Int32,
        required: true
    }
}, {
    collection: 'usuarios'
})
usuarioSchema.loadClass(Usuario)
export const usuarioModel = mongoose.model('Usuario', usuarioSchema)