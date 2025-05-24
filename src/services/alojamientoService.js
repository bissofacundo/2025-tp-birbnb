import { Alojamiento } from "../domain/alojamiento.js";

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
  
    //Falta implementar bien
    async create(alojamiento) {
    const { nombre } = alojamiento;
    //me debería fijar por direccion en vez de nombre?
    if (!nombre) {
        throw new ValidationError('El nombre de la categoría es requerido');
    }

    const existente = await this.categoryRepository.findByName(nombre);
    if (existente) {
        throw new ConflictError(`Ya existe una categoría con el nombre ${nombre}`);
    }

    const nuevo = new Alojamiento(nombre);
    const alojamientoGuardado = await this.alojamientoRepository.save(nuevo);
    return this.alojamientoADTO(alojamientoGuardado);
}

    async alojamientoADTO(alojamiento){ //Revisar que mando
        
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