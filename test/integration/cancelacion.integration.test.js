import { describe, expect, jest, test }  from "@jest/globals"
import request from "supertest"
import express from "express" 
import { TipoUsuario } from "../../domain/enums/tipo_usuario.js"
import { Usuario } from "../../domain/usuario.js"
import { Alojamiento } from "../../domain/alojamiento.js"
import { Moneda } from "../../domain/enums/moneda.js"
import { Notificacion } from "../../domain/notificacion.js"
import { ReservaController } from "../../controllers/reserva_controller.js"
import { UsuariosController } from "../../controllers/usuarios_controller.js"
import { Reserva } from "../../domain/reserva.js"

const app = express()

const anfitrionPrueba = new Usuario("Perez", "perez@hotmail.com", TipoUsuario.ANFITRION)
const huespedPrueba = new Usuario("Juan", "juan2000@gmail.com", TipoUsuario.HUESPED)

const reservaPrueba = new Reserva(huespedPrueba, 2, alojamientoPrueba, {fechaInicio: "2025-02-14", fechaFin: "2025-03-15"})

const alojamientoPrueba = new Alojamiento(anfitrionPrueba, "El pinzon", "Una linda casa para veranear",
    150000, Moneda.PESO_ARG, "horarioCheckIn",
    "horarioCheckOut", "direccion", 15
)

const notificacionPrueba = new Notificacion(anfitrionPrueba, "prueba")

const notificacionRepository = {
    guardarNotificacion: jest.fn(notificacion =>{
        notificacion.id = 1
        return notificacion
    })
}

const usuarioRepository = {
    agaregarNotificacion: jest.fn((usuarioId, notificacionId) => 
        huespedPrueba.id = usuarioId,
        huespedPrueba.notificaciones.push(notificacionId)
    ),
    obtenerReservas: jest.fn().mockResolvedValue(
        [reservaPrueba]
    )
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



app.use(express.json())
app.patch("/reservas/:id", (req, res) => {
  ReservaController.cancelarReserva(req, res)
})
app.get("/usuarios/:id/reservas", (req, res) => {
  UsuariosController.obtenerReservas(req, res)
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