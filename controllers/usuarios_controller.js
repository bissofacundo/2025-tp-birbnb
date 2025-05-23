import { ValidacionInvalida } from "../exceptions/datos_invalidos.js";

export class UsuariosController{
    usuarioRepository
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository
    }
    
    async obtenerReservas(req, res){
        try {
            id = req.params.id

            if(typeof id !== 'number'){
                throw new ValidacionInvalida('el id debe ser un numero')
            }

            reservas = await this.usuarioRepository.obtenerReservas(id).bind(this)

            if(!reservas){
                throw new ColeccionVacia('No hay ninguna reserva en la coleccion')
            }
            res.json((reservas.forEach(reserva => this.toDTO(reserva))))
        } catch (error) {
            if(!error.status) {
                res.status(500).json({error: "Error en el servidor"})
            } else {
                res.status(error.status).json({error: error.message, tipoError: error.nombreError})
            }
        }
    }

    toDTO(reserva) {

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