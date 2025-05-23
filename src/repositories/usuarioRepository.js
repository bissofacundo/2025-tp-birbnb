import { usuarioModel } from "./schemas/usuarioSchema.js"

export class UsuarioRepository {
    constructor() {
        this.model = usuarioModel
    }

    async findAll() {
        const usuarios = await this.model.find()
        return usuarios
    }
    async findById(id){
        const usuario = await this.model.findById(id)
        return usuario
    }
}