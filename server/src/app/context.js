import { ReservaController } from "../controllers/reservaController.js";
import { ReservaRepository } from "../repositories/reservaRepository.js";
import { ReservaService } from "../services/reservaService.js";
import { AlojamientoRepository } from "../repositories/alojamientoRepository.js";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";
import { UsuarioController } from "../controllers/usuarioController.js";
import { NotificacionRepository } from "../repositories/notificacionRepository.js";
import { AlojamientoController} from "../controllers/alojamientoController.js";
import { AlojamientoService } from "../services/alojamientoService.js";
import { NotificacionService } from "../services/notificacionService.js";
import { NotificacionController } from "../controllers/notificacionController.js"

export const buildAppContext = () => {
    const usuarioRepository = new UsuarioRepository()
    const notificacionRepository = new NotificacionRepository()
    const reservaRepository = new ReservaRepository(usuarioRepository)
    const alojamientoRepository = new AlojamientoRepository(usuarioRepository)
    alojamientoRepository.reservaRepository=reservaRepository
    reservaRepository.alojamientoRepository=alojamientoRepository
    const reservaService = new ReservaService(reservaRepository, alojamientoRepository, usuarioRepository, notificacionRepository)
    const reservaController = new ReservaController(reservaService, reservaRepository)
    const usuarioController = new UsuarioController(usuarioRepository, reservaRepository)
    const alojamientoService = new AlojamientoService(alojamientoRepository)
    const alojamientoController = new AlojamientoController(alojamientoService)
    const notificacionService = new NotificacionService(notificacionRepository, usuarioRepository)
    const notificacionController = new NotificacionController(notificacionService)
    return {
        reservaRepository,
        alojamientoRepository,
        reservaService,
        reservaController,
        usuarioController,
        usuarioRepository,
        alojamientoService,
        alojamientoController,
        notificacionController,
        notificacionService
    };
};