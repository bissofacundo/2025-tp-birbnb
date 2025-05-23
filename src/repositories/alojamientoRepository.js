import { AlojamientoModel } from "./schemas/alojamientoSchema.js"

export class AlojamientoRepository {
    constructor() {
        this.model = AlojamientoModel
    }

    async findAll(filters = {}) {
        const query = {};

        // Dirección
        if (filters.calle) {
            query["direccion.calle"] = filters.calle;
        }

        if (filters.altura) {
            query["direccion.altura"] = Number(filters.altura); // Convertís igual, aunque esté como string
        }

        if (filters.ciudad) {
            query["direccion.ciudad"] = filters.ciudad;
        }

        if (filters.pais) {
            query["direccion.pais"] = filters.pais;
        }

        if (filters.lat) {
            query["direccion.lat"] = Number(filters.lat);
        }
        if (filters.long) {
            query["direccion.long"] = Number(filters.long);
        }

        // Precio
        if (filters.precioMin || filters.precioMax) {
            query.precioPorNoche = {};
            if (filters.precioMin) query.precioPorNoche.$gte = Number(filters.precioMin);
            if (filters.precioMax) query.precioPorNoche.$lte = Number(filters.precioMax);
        }

        // Huespedes
        if (filters.huespedes) {
            query.cantHuespedesMax = { $gte: Number(filters.huespedes) };
        }

        // Características
        if (filters.caracteristicas && filters.caracteristicas.length > 0) {
            query.caracteristicas = { $all: filters.id_caracteristicas };
        }
        const alojamientosFiltrados = await this.model.find(query)
        return alojamientosFiltrados
    }

    async findById(id){
        const alojamientosFiltrados = await this.model.findById(id)
        return alojamientosFiltrados
    }

    async findByNombre(nombre){
        const alojamientosFiltrados = await this.model.findOne({nombre})
        return alojamientosFiltrados
    }

}