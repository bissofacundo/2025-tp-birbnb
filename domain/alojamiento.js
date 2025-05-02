import {sumBy} from "lodash-es";
import { ReservaInvalida, AlojamientoInvalido } from "../exceptions/alojamiento";
import { Reserva } from "./reserva";
import { FactoryNotificacion } from "./factory_notificacion";

export class Alojamiento {
    anfitrion;
    nombre;
    descripcion;
    precioPorNoche;
    moneda;
    horarioCheckIn;
    horarioCheckOut;
    direccion;
    cantHuespedesMax;
    caracteristicas;
    reservas;
    fotos;

    constructor(anfitrion, nombre, descripcion,
        precioPorNoche, moneda, horarioCheckIn,
        horarioCheckOut, direccion, cantHuespedesMax,
        caracteristicas, fotos)
    {
        this.validarParametros()
        this.anfitrion = anfitrion
        this.nombre = nombre
        this.descripcion = descripcion
        this.precioPorNoche = precioPorNoche
        this.moneda = moneda
        this.horarioCheckIn = horarioCheckIn
        this.horarioCheckOut = horarioCheckOut
        this.direccion = direccion
        this.cantHuespedesMax = cantHuespedesMax
        this.caracteristicas = caracteristicas || []
        this.fotos = fotos || []
        this.reservas = []
    }

    validarParametros(anfitrion, nombre,
        precioPorNoche, moneda, horarioCheckIn,
        horarioCheckOut, direccion, cantHuespedesMax
        ) {
        if ([anfitrion, nombre,
            precioPorNoche, moneda, horarioCheckIn,
            horarioCheckOut, direccion, cantHuespedesMax].some(v => !v)) {
          throw new AlojamientoInvalido(`El alojamiento necesita anfitrion, nombre, precioPorNoche, 
            moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, 
            se recibio anfitrion: ${anfitrion}, nombre: ${nombre}, precioPorNoche: ${precioPorNoche},
            moneda: ${moneda}, horarioCheckIn: ${horarioCheckIn}, horarioCheckOut: ${horarioCheckOut},
            direccion: ${direccion}, cantHuespedesMax: ${cantHuespedesMax}` );
        }
    }

    tuPrecioEstaDentroDe(valorMinimo, valorMaximo){
        return this.precioPorNoche > valorMinimo && this.precioPorNoche < valorMaximo
    }

    tenesCaracteristica(caracteristica){
        return this.caracteristicas.some(c => c === caracteristica)
    }

    puedenAlojarse(cantHuespedes){
        return (this.cantHuespedesMax - sumBy(this.reservas, r => r.cantHuespedes)) >= cantHuespedes
    }

    estasDisponibleEn(rangoDeFechas){
        return !this.reservas.some(r => r.teSuperponesCon(rangoDeFechas))
    }

    agregarReserva(reserva){
        this.reservas.push(reserva)
    }

    getAnfitrion(){
        return this.anfitrion
    }
}