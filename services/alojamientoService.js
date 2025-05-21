import { Alojamiento } from "../domain/alojamiento.js";

export class AlojamientoService{
    //alojamientoRepository
    constructor(){
        //this.alojamientoRepository = alojamientoRepository;
    }
    async findAll(alojamientosMentira,filters){
        const alojamientosFiltrados = await this.aplicarFiltro(alojamientosMentira,filters) 
        const respuesta = alojamientosFiltrados ? 
        this.muchosAlojamientoADTO(alojamientosFiltrados)
        : [] 
        return respuesta;
    }

    async aplicarFiltro(alojamientosMentira,filters){

        return await alojamientosMentira.filter(aloj =>{ //Este Await se aplica a todo? Pregunta
            
            //Me llega un Array con strings
            const coincideCaracteristicas = filters.caracteristicas ?
            filters.caracteristicas.every(carac=>aloj.tenesCaracteristica(carac))
            :true

            const coincidePrecio = filters.precioMin != null || filters.precioMax != null ?  
            aloj.tuPrecioEstaDentroDe(filters.precioMin,filters.precioMax)
            :true
            
            const coincideDireccion = !this.esDireccionVacia(filters) ? 
            aloj.direccion.coincideDireccion(filters)
            :true
           
            const coincideCantHuespedes =filters.huespedes ?
            aloj.puedenAlojarse(filters.huespedes)
            :true

            return coincideDireccion & coincidePrecio & coincideCantHuespedes & coincideCaracteristicas;
        });
    }

    async alojamientoADTO(alojamiento){ //Revisar que mando
        return {
            "anfitrion": alojamiento.anfitrion,
            "nombre": alojamiento.nombre,
            "descripcion": alojamiento.descripcion,
            "precioPorNoche": alojamiento.precioPorNoche,
            "moneda": alojamiento.moneda,
            "horarioCheckIn": alojamiento.horarioCheckIn,
            "horarioCheckOut": alojamiento.horarioCheckOut,
            "direccion": alojamiento.direccion,
            "cantHuespedesMax": alojamiento.cantHuespedesMax,
            "caracteristicas" : alojamiento.caracteristicas
        }
    }
    async muchosAlojamientoADTO(lista) {
    const rta = await Promise.all(lista.map(a => this.alojamientoADTO(a)));
    return rta
    }

    esDireccionVacia(filters){ // Está bien así o debería ser Async?
        return  (filters.calle == null || filters.calle === "") &&
                (filters.altura == null) &&
                (filters.ciudad == null || filters.ciudad === "") &&
                (filters.pais == null || filters.pais === "") &&
                (filters.lat == null) &&
                (filters.long == null);
    }
}