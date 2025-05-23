import { ReservaController } from "../controllers/reservaController.js";
import { ReservaRepository } from "../repositories/reservaRepository.js";
import { ReservaService } from "../services/reservaService.js";
import { AlojamientoRepository } from "../repositories/alojamientoRepository.js";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";
import { UsuarioController } from "../controllers/usuarioController.js";


export const buildAppContext = () => {
    const reservaRepository = new ReservaRepository()
    const alojamientoRepository = new AlojamientoRepository()
    const usuarioRepository = new UsuarioRepository()
    const reservaService = new ReservaService(reservaRepository, alojamientoRepository, usuarioRepository)
    const reservaController = new ReservaController(reservaService, reservaRepository)
    const usuarioController = new UsuarioController(usuarioRepository)
    return {
        reservaRepository,
        alojamientoRepository,
        reservaService,
        reservaController,
        usuarioController,
        usuarioRepository
    };
};