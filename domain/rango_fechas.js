import {RangoFechasInvalido} from "../exceptions/rango_fechas.js"

export class RangoFechas {
    fecha_inicio
    fecha_fin   

    constructor(fecha_inicio, fecha_fin) {
        this.validarFechasIngresadas(fecha_inicio, fecha_fin);
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }   

    validarFechasIngresadas(inicio,fin) {
        if (!inicio || !fin) {
            throw new RangoFechasInvalido(`El rango de fechas requiere fecha inicial y final, se recibio fecha_inicio: ${inicio}, fecha_fin: ${fin}` );
          }
        
        if(inicio > fin) {
            throw new RangoFechasInvalido(`La fecha de inicio (${inicio}) no puede ser mayor a la fecha de fin (${fin})`);
        }
    }
}


