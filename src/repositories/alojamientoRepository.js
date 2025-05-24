import { AlojamientoModel } from "./schemas/alojamiento_schema.js"

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
            query["direccion.altura"] = Number(filters.altura); 
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
        const alojamientosFiltrados = await this.model.find(query).skip(filters.skip)
            .limit(filters.limit);
        return alojamientosFiltrados
    }

}