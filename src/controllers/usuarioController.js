export class UsuarioController {
    usuarioRepository
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository
    }
    // async crearReserva(req, res) {
    //     // this.reservaRepository.findAll()
    //     // console.log(this.reservaRepository.findAll())
    //     res.status(201).json(this.reservaRepository.findAll())
    // }
    async getUsuarios(req, res){
        const usuarios = await this.usuarioRepository.findAll()
        const usuariosMap = usuarios.map(u => this.toDTO(u))
        res.status(200).json(usuariosMap)
        // res.status(200).json({"nombre":"pepe"})
    }
    toDTO(usuario) {
        return {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            tipo: usuario.tipo
        };
    }
}