import { UsuarioModel } from './schemas/usuarioSchema.js'

export class UsuarioRepository {
    model
    constructor() {
        this.model = UsuarioModel;
    }

    async guardarUsuario(usuario) {
        this.usuarios.push(usuario)

        if (usuario.id) {
            const usuarioActualizado = await this.model.findByIdAndUpdate(
                usuario.id,
                usuario,
                { new: true, runValidators: true }
            );
            return usuarioActualizado;
        } else {
            const nuevoUsuario = new this.model(usuario);
            const usuarioGuardado = await nuevoUsuario.save();
            return usuarioGuardado;
        }
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async obtenerUsuarios() {
        return await this.model.find();
    }

    async eliminarUsuario(id) {
    const resultado = await this.model.findByIdAndDelete(id);
        return resultado !== null;
    }
}