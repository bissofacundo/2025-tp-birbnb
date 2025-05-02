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

    getAnfirtrion(){
        return this.anfitrion
    }

    
    //requerimiento 1
    realizarReserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas){
        if(!this.puedenAlojarse(cantHuespedes)){
            throw new ReservaInvalida('maxima cantidad de huespedes superada')
        }
        if(!this.estasDisponibleEn(rangoFechas)){
            throw new ReservaInvalida('rango de fecha ocupado')
        }
        reserva = new Reserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas)
        notificacion = FactoryNotificacion.crearSegunReserva(reserva)
        NotificacionRepository.guardarNotificacion(notificacion)
        this.agregarReserva(nuevaReserva)
        return nuevaReserva
    }

    //requerimiento 2
    aceptarReserva(index){
        if(index > this.reservas.length - 1){
            throw new ReservaInvalida('no existe ese numero de reserva')
        }
        reserva = this.reservas[index]
        reserva.actualizarEstado(Estado.CONFIRMADA)
        cambiarEstado = new CambioEstadoReserva( 
            Estado.CONFIRMADA,
            reserva,
            " ",
            reserva.huespedReservador
        )
        notificacion = FactoryNotificacion.crearSegunReserva(reserva)
        NotificacionRepository.guardarNotificacion(notificacion)
        return reserva
    }

    //requerimiento 3
    cancelarReserva(index, motivo){
        if(index > this.reservas.length - 1){
            throw new ReservaInvalida('no existe ese numero de reserva')
        }
        reserva = this.reservas[index]
        reserva.actualizarEstado(Estado.CONFIRMADA)
        cambiarEstado = new CambioEstadoReserva( 
            Estado.CONFIRMADA,
            reserva,
            " ",
            reserva.huespedReservador
        )
        notificacion = FactoryNotificacion.crearSegunReserva(reserva)
        notificacion.aniadirMotivo(motivo)
        NotificacionRepository.guardarNotificacion(notificacion)
        this.reservas.splice(index, 1)
        return reserva
    }
}