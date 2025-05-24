export class UsuarioController {
    usuarioRepository
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository
    }

    async getUsuarios(req, res){
        const usuarios = await this.usuarioRepository.findAll()
        const usuariosMap = usuarios.map(u => this.toDTO(u))
        res.status(200).json(usuariosMap)
    }
    async getUsuario(req, res){
        const usuario = await this.usuarioRepository.findById(req.params.id)
        const usuarioDTO = this.toDTO(usuario)
        res.status(200).json(usuarioDTO)
    }
    toDTO(usuario) {
        return {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            tipoUsuario: usuario.tipoUsuario
        };
    }
}