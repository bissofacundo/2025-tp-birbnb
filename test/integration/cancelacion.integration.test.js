import { describe, expect, jest, test }  from "@jest/globals"
import request from "supertest"
import express from "express" 
import { TipoUsuario } from "../../src/domain/enums/tipoUsuario.js"
import { Usuario } from "../../src/domain/usuario.js"
import { Alojamiento } from "../../src/domain/alojamiento.js"
import { Moneda } from "../../src/domain/enums/moneda.js"
import { Notificacion } from "../../src/domain/notificacion.js"
import { ReservaController } from "../../src/controllers/reservaController.js"
import { Reserva } from "../../src/domain/reserva.js"
import { ReservaService } from "../../src/services/reservaService.js"
import { UsuariosService } from "../../src/services/usuarioService.js"
import { NotificacionService } from "../../src/services/notificacionService.js"

const app = express()

const anfitrionPrueba = new Usuario("Perez", "perez@hotmail.com", TipoUsuario.ANFITRION)
const huespedPrueba = new Usuario("Juan", "juan2000@gmail.com", TipoUsuario.HUESPED)


const alojamientoPrueba = new Alojamiento(anfitrionPrueba, "El pinzon", "Una linda casa para veranear",
    150000, Moneda.PESO_ARG, "horarioCheckIn",
    "horarioCheckOut", "direccion", 15
)

const reservaPrueba = new Reserva(huespedPrueba, 2, alojamientoPrueba, {fechaInicio: "2025-02-14", fechaFin: "2025-03-15"})

const notificacionPrueba = new Notificacion(anfitrionPrueba, "prueba")

const notificacionRepository = {
    guardarNotificacion: jest.fn(notificacion =>{
        notificacion.id = 1
        return notificacion
    })
}

const usuarioRepository = {
    agaregarNotificacion: jest.fn((usuarioId, notificacionId) => {
        huespedPrueba.id = usuarioId
        huespedPrueba.notificaciones.push(notificacionId)
    })
}

const alojamientoRepository = {
    findById: jest.fn().mockResolvedValue(
        alojamientoPrueba
    ),

    actualizarAlojamiento: jest.fn()
}


const reservaRepository = {
    guardarReserva: jest.fn(reserva => { 
        reserva.id = 1
        return reserva
    }),
    findReservaId: jest.fn(id => {
        reservaPrueba.id = id
        return reservaPrueba
    })
}

const notificacionService = new NotificacionService(notificacionRepository)
const usuariosService = new UsuariosService(usuarioRepository, notificacionService)
const reservaService = new ReservaService(reservaRepository, alojamientoRepository, usuariosService, notificacionRepository)

const reservaController = new ReservaController(reservaService)

app.use(express.json())
app.patch("/reservas/:id", (req, res) => {
  reservaController.cancelarReserva(req, res)
})

describe("PATCH /reservas/:id", () => {
    test("Cancelacion de reserva", async() => {
        const cancelacionRequest = {
            motivo: "prueba"
        }

        const response = await request(app).patch('/reservas/1').send(cancelacionRequest)

        expect(response.status).toBe(200)
    })

})