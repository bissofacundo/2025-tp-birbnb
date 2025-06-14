import {  AlojamientoInvalido } from "../exceptions/alojamiento.js";

export class Alojamiento {
    anfitrion  ;
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

    constructor({anfitrion, nombre, descripcion,
        precioPorNoche, moneda, horarioCheckIn,
        horarioCheckOut, direccion, cantHuespedesMax,
        caracteristicas, fotos, sinParametros})
    {
        if(!sinParametros) {
            this.validarParametros(anfitrion, nombre,
            precioPorNoche, moneda, horarioCheckIn,
            horarioCheckOut, direccion, cantHuespedesMax)
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
    }

    validarParametros(anfitrion, nombre,
        precioPorNoche, moneda, horarioCheckIn,
        horarioCheckOut, direccion, cantHuespedesMax) {
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

    static build(){
        return new Alojamiento({sinParametros: true})
    }


    tuPrecioEstaDentroDe(valorMinimo, valorMaximo){   
        if (valorMinimo != null && valorMaximo != null) {
        return this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo;
    } else if (valorMinimo != null) {
        return this.precioPorNoche >= valorMinimo;
    } else if (valorMaximo != null) {
        return this.precioPorNoche <= valorMaximo;
    }
    }

    tenesCaracteristica(caracteristica){
        return this.caracteristicas.some(c => c.nombre === caracteristica)
    }

    puedenAlojarse(cantHuespedes){
        return this.cantHuespedesMax >= cantHuespedes
    }

    estaDisponibleEn(rangoDeFechas){
        return !this.reservas.filter(reserva => reserva.noEstaCancelada()).some(r => r.teSuperponesCon(rangoDeFechas))
    }

    agregarReserva(reserva){
        this.reservas.push(reserva)
    }

    getAnfitrion(){
        return this.anfitrion
    }

    getCalle() {
        return this.direccion.calle
    }

    getAltura() {
        return this.direccion.altura
    }

    getCiudad() {
        return this.direccion.getCiudad()
    }

    getLatitud() {
        return this.direccion.lat
    }

    getLongitud() {
        return this.direccion.long
    }

    getPais() {
        return this.direccion.getPais()
    }
}