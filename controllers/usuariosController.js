import { UsuarioRepository } from "../repositories/usuarioRepository";

export const UsuariosController = {
    
    async obtenerReservas(req, res){
        try {
            reservas = await UsuarioRepository.obtenerReservas(req.params.id)
            res.json(reservas);
        } catch (error) {
            console.log("error!") //cambiar
        }
    }
}