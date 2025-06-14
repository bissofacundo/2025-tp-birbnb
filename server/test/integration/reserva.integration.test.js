import { describe, expect, jest, test }  from "@jest/globals"
import  request   from "supertest"
import { TipoUsuario } from "../../src/domain/enums/tipoUsuario.js"
import { Usuario } from "../../src/domain/usuario.js"
import { Alojamiento } from "../../src/domain/alojamiento.js"
import { Moneda } from "../../src/domain/enums/moneda.js"
import express from "express" 
import { ReservaService } from "../../src/services/reservaService.js" 
import { ReservaController } from "../../src/controllers/reservaController.js"

import { Reserva } from "../../src/domain/reserva.js"
import { configurarServerPrueba } from "./utils/configServer.js"

const app = express()

const anfitrionPrueba = new Usuario("Perez", "perez@hotmail.com", TipoUsuario.ANFITRION)


const alojamientoPrueba = new Alojamiento(anfitrionPrueba, "El pinzon", "Una linda casa para veranear",
        150000, Moneda.PESO_ARG, "horarioCheckIn",
        "horarioCheckOut", "direccion", 15)

       
const alojamientoRepository = {
    findById: jest.fn().mockResolvedValue(
        alojamientoPrueba
    ),

    actualizarAlojamiento: jest.fn()
}

const usuarioRepository = {
    findById: jest.fn().mockResolvedValue({
        nombre: "Juancito",
        email: "juancito@gmail.com",
        tipoUsuario: TipoUsuario.HUESPED 
    }),
    actualizarUsuario: jest.fn()
}


const reservaRepository = {
    crearReserva: jest.fn(reserva => { 
        reserva.id = 1
        return reserva
    })
}

const notificacionRepository = {
    guardarNotificacion: jest.fn()
}



const reservaService = new ReservaService(reservaRepository, alojamientoRepository, usuarioRepository, notificacionRepository)
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
        expect(reservaRepository.crearReserva).toHaveBeenCalledWith(expect.any(Reserva))
        expect(alojamientoRepository.actualizarAlojamiento).toHaveBeenCalled()
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
        expect(response.body.tipoError).toBe("Error de validacion")
    })

    test("Creación de una reserva superando la cantidad de huespedes del alojamiento", async () => {
        const reservaRequest = {
            alojamiento: 1,
            huespedReservador: 1,
            cantHuespedes: 16,
            fechaInicio: "2025-03-16",
            fechaFin: "2025-03-20"
        }
        
        const response =  await request(app).post('/reservas').send(reservaRequest)

        console.log(response.body)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe(`Error: la reserva ingresada no cumple con los requisitos: La reserva supero la maxima cantidad de huespedes que el alojamiento ${alojamientoPrueba.nombre} permite. La maxima cantidad de huespedes que admite el alojamiento es ${alojamientoPrueba.cantHuespedesMax}`)
        expect(response.body.tipoError).toBe("Reserva creada invalida")
    })

    test("Creación de una reserva con datos demas", async () => {
        const reservaRequest = {
            idBasura: 389234892,
            saraza: "luendo",
            alojamiento: 1,
            huespedReservador: 1,
            cantHuespedes: 2,
            fechaInicio: "2025-03-16",
            fechaFin: "2025-03-20"
        }
        
        const response =  await request(app).post('/reservas').send(reservaRequest)

        console.log(response.body)
        expect(response.status).toBe(201)
    })

    test("Creación de una reserva sin pasar datos", async () => {
        const reservaRequest = {
        }
        
        const response =  await request(app).post('/reservas').send(reservaRequest)

        console.log(response.body)
        expect(response.status).toBe(400)
        expect(response.body.tipoError).toBe("Error de validacion")
    })

    test("Creación de una reserva sin pasar una cantidad de huespedes numerica", async () => {
        const reservaRequest = {
            alojamiento: 1,
            huespedReservador: 1,
            cantHuespedes: "hola",
            fechaInicio: "2025-03-16",
            fechaFin: "2025-03-20"
        }
        
        const response =  await request(app).post('/reservas').send(reservaRequest)

        console.log(response.body)
        expect(response.status).toBe(400)
        expect(response.body.tipoError).toBe("Error de validacion")
    })
})