import { RangoFechasInvalido } from "../exceptions/rango_fechas.js"

const CANTMILISEGUNDOSPORSEGUNDO = 1000
const CANTSEGUNDOSPORHORA = 3600
const CANTHORASPORDIA = 24
export class RangoFechas {
    fechaInicio
    fechaFin

    constructor(fechaInicio, fechaFin) {
        this.validarFechasIngresadas(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    validarFechasIngresadas(inicio, fin) {
        if (!inicio || !fin || [inicio, fin].some(fecha => !(fecha instanceof Date) )) {
            throw new RangoFechasInvalido(`El rango de fechas requiere fecha inicial y final, se recibio fechaInicio: ${inicio}, fechaFin: ${fin}`);
        }

        if (inicio > fin) {
            throw new RangoFechasInvalido(`La fecha de inicio (${inicio}) no puede ser mayor a la fecha de fin (${fin})`);
        }
    }

    tieneInterseccionCon(rangoFechas) {
        return rangoFechas.estaEnElRango(this.fechaInicio)
            || rangoFechas.estaEnElRango(this.fechaFin)
    }

    estaEnElRango(fecha) {
        return this.fechaInicio <= fecha &&
            fecha <= this.fechaFin
    }

    cantidadDias() {
        const duracionEnMiliseg = this.fechaFin.getTime() - this.fechaInicio.getTime()
        const duracionEnDias = this.tranformarMilisegADias(duracionEnMiliseg)
        return Math.round(duracionEnDias)
    }

    //Pasa los milisegundos a segundo, luego a horas y luego a dias
    tranformarMilisegADias(milisegundos) {
        return milisegundos / ( CANTMILISEGUNDOSPORSEGUNDO
            * CANTSEGUNDOSPORHORA
            * CANTHORASPORDIA)
    }
}


