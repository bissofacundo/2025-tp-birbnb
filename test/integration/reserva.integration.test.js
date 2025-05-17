import { describe, expect, jest, test }  from "@jest/globals"
import  request   from "supertest"
import { TipoUsuario } from "../../domain/enums/tipo_usuario.js"
import { Usuario } from "../../domain/usuario.js"
import { Alojamiento } from "../../domain/alojamiento.js"
import { Moneda } from "../../domain/enums/moneda.js"
import express from "express" 
import { ReservaService } from "../../services/reserva_service.js" 
import { ReservaController } from "../../controllers/reserva_controller.js"

import { Reserva } from "../../domain/reserva.js"
import { configurarServerPrueba } from "./utils/config_server.js"

const app = express()

const anfitrionPrueba = new Usuario("Perez", "perez@hotmail.com", TipoUsuario.ANFITRION)


const alojamientoPrueba = new Alojamiento(anfitrionPrueba, "El pinzon", "Una linda casa para veranear",
        150000, Moneda.PESO_ARG, "horarioCheckIn",
        "horarioCheckOut", "direccion", 15)

       
const alojamientoRepository = {
    findById: jest.fn().mockResolvedValue(
        alojamientoPrueba
    )
}

const usuarioRepository = {
    findById: jest.fn().mockResolvedValue({
        nombre: "Juancito",
        email: "juancito@gmail.com",
        tipoUsuario: TipoUsuario.HUESPED 
    })
}

const reservaRepository = {
    save: jest.fn(reserva => { 
        reserva.id = 1
        return reserva
    })
}

const reservaService = new ReservaService(reservaRepository, alojamientoRepository, usuarioRepository)
const reservaController = new ReservaController(reservaService)
configurarServerPrueba(app, reservaController)

describe("POST /reservas", () => {
    test("Creación de una reserva con exito", async () => {
        const reservaRequest = {
            alojamiento: 1,
            huespedReservador: 1,
            cantHuespedes: 13,
            fechaInicio: "2025-02-14",
            fechaFin: "2025-03-15"
        }
        
        const response =  await request(app).post('/reservas').send(reservaRequest)

        console.log(response.body)
        expect(response.status).toBe(201)
        expect(reservaRepository.save).toHaveBeenCalledWith(expect.any(Reserva))
    })

    test("Creación de una reserva con la fecha de inicio erronea", async () => {
        const reservaRequest = {
            alojamiento: 1,
            huespedReservador: 1,
            cantHuespedes: 13,
            fechaInicio: "Chacota",
            fechaFin: "2025-03-15"
        }
        
        const response =  await request(app).post('/reservas').send(reservaRequest)

        console.log(response.body)
        expect(response.status).toBe(400)
    })

    test("Creación de una reserva superando la cantidad de huespedes del alojamiento", async () => {
        const reservaRequest = {
            alojamiento: 1,
            huespedReservador: 1,
            cantHuespedes: 16,
            fechaInicio: "2025-02-14",
            fechaFin: "2025-03-15"
        }
        
        const response =  await request(app).post('/reservas').send(reservaRequest)

        console.log(response.body)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe(`la reserva ingresada no cumple con los requisitos: La reserva supero la maxima cantidad de huespedes que el alojamiento ${alojamientoPrueba.nombre} permite. La maxima cantidad de huespedes que admite el alojamiento es ${alojamientoPrueba.cantHuespedesMax}`)
    })
})