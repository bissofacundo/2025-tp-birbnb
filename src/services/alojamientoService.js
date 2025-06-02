

export class AlojamientoService {
    alojamientoRepository
    constructor(alojamientoRepository) {
        this.alojamientoRepository = alojamientoRepository;
    }
    async findAll(filters = {}) {
        const alojamientos = await this.alojamientoRepository.findAll(filters)
        const alojamientosDTO = alojamientos?await Promise.all(alojamientos.map(alojamiento => this.alojamientoADTO(alojamiento))):[];
        return alojamientosDTO
    }
  


    async alojamientoADTO(alojamiento) { 
        const alojamientoDTO = {
            "anfitrion": alojamiento.anfitrion,
            "nombre": alojamiento.nombre,
            "descripcion": alojamiento.descripcion,
            "precioPorNoche": alojamiento.precioPorNoche,
            "moneda": alojamiento.moneda,
            "horarioCheckIn": alojamiento.horarioCheckIn,
            "horarioCheckOut": alojamiento.horarioCheckOut,
            "direccion": alojamiento.direccion,
            "cantHuespedesMax": alojamiento.cantHuespedesMax,
            "caracteristicas": alojamiento.caracteristicas
         };   
        return alojamientoDTO
    }

}
