import mongoose from "mongoose";
import { Usuario } from "../domain/usuario";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tipoUsuario: {
        type: String,
        enum: ['Huesped', 'Anfitrion'],
        required: true
    }
    //notificaciones: [{
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Notificacion'
    //}]
});

usuarioSchema.loadClass(Usuario);

export const UsuarioModel = mongoose.model('Usuario', usuarioSchema);
