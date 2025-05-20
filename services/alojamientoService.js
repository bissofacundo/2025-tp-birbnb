import { Alojamiento } from "../domain/alojamiento.js";

export class AlojamientoService{
    //alojamientoRepository
    constructor(){
        //this.alojamientoRepository = alojamientoRepository;
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