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
        //Falta hacer bien Direccion
        return await alojamientosMentira.filter(aloj =>{
            console.log(filters.precioMin != null || filters.precioMax != null)
            const coincideCaracteristicas = filters.caracteristicas ?
            aloj.tenesCaracteristica(filters.caracteristicas)
            :true

            const coincidePrecio = filters.precioMin != null || filters.precioMax != null ?  
            aloj.tuPrecioEstaDentroDe(filters.precioMin,filters.precioMax)
            :true
            
            const coincideDireccion = filters.ubicacion ? //Debería estar en Alojamiento esto? mejorar | Cambiar Direccion
            aloj.direccion.toLowerCase() == filters.ubicacion
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
            "cantHuespedesMax": alojamiento.cantHuespedesMax
            //Faltan 3 mas que no sé si van
        }
    }
    async muchosAlojamientoADTO(lista) {
    const rta = await Promise.all(lista.map(a => this.alojamientoADTO(a)));
    return rta
    }
}