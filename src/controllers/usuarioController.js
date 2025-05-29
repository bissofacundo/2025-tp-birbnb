import { isValidObjectId } from "mongoose"
import { aReservaRest } from "./reservaController.js"
import { ValidacionInvalida } from "../exceptions/datosInvalidos.js"
import { ColeccionVacia } from "../exceptions/coleccionVacia.js"
import { EntidadNoEncontrada } from "../exceptions/busquedaEntidad.js"

export class UsuarioController {
    usuarioRepository
    reservaRepository
    constructor(usuarioRepository, reservaRepository) {
        this.usuarioRepository = usuarioRepository
        this.reservaRepository = reservaRepository
    }

    async getUsuarios(req, res){
        const usuarios = await this.usuarioRepository.findAll()
        const usuariosMap = usuarios.map(u => this.toDTO(u))
        res.status(200).json(usuariosMap)
    }
    async getUsuario(req, res){
        const usuario = await this.usuarioRepository.findById(req.params.id)
        if(!usuario){
            throw new EntidadNoEncontrada("No existe el usuario proporcionado")
        }
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
        async obtenerReservas(req, res){
            try {
                const id = req.params.id
    
                if(!isValidObjectId(id)){
                    throw new ValidacionInvalida('el id no es valido')
                }

                const usuario = await this.usuarioRepository.findById(req.params.id)

                if(!usuario){
                    throw new EntidadNoEncontrada("No existe el usuario proporcionado")
                }
    
                const reservas = await this.reservaRepository.obtenerReservas(id)
    
                if(!reservas){
                    throw new ColeccionVacia('No hay ninguna reserva en la coleccion')
                }
                res.json((reservas.map(reserva => aReservaRest(reserva))))
            } catch (error) {
                if(!error.status) {
                    console.log(error)
                    res.status(500).json({error: "Error en el servidor"})
                } else {
                    res.status(error.status).json({error: error.message, tipoError: error.nombreError})
                }
            }
        }
        toDTOReserva(reserva) {

            return {
                fechaAlta: reserva.fechaAlta,
                alojamiento: reserva.alojamiento,
                cantHuespedes: reserva.cantHuespedes,
                rangoFechas: reserva.rangoFechas,
                estado: reserva.estado,
                precioPorNoche: reserva.precioPorNoche
            }
        }
}