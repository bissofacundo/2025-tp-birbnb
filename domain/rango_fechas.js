import {RangoFechasInvalido} from "../exceptions/rango_fechas.js"

export class RangoFechas {
    fechaInicio
    fechaFin   

    constructor(fechaInicio, fechaFin) {
        this.validarFechasIngresadas(fechaInicio, fechaFin);
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }   

    validarFechasIngresadas(inicio,fin) {
        if (!inicio || !fin) {
            throw new RangoFechasInvalido(`El rango de fechas requiere fecha inicial y final, se recibio fechaInicio: ${inicio}, fechaFin: ${fin}` );
          }
        
        if(inicio > fin) {
            throw new RangoFechasInvalido(`La fecha de inicio (${inicio}) no puede ser mayor a la fecha de fin (${fin})`);
        }
    }
}


