import { AlojamientoModel } from "./schemas/alojamientoSchema.js"
import { Direccion, Pais, Ciudad } from "../domain/direccion.js"
import { Moneda } from "../domain/enums/moneda.js"
import { Foto } from "../domain/foto.js"
import { Alojamiento } from "../domain/alojamiento.js"
import { Caracteristica } from "../domain/enums/caracteristica.js"

export class AlojamientoRepository {
    usuarioRepository
    reservaRepository

    constructor(usuarioRepository) {
        this.model = AlojamientoModel
        this.usuarioRepository = usuarioRepository
    }

    async deAlojamientoDB(alojamientoDB) {
        const alojamiento = Alojamiento.build();
        const pais = new Pais(alojamientoDB.direccion.pais)
        const ciudad = new Ciudad(alojamientoDB.direccion.ciudad, pais)
        const direccion = new Direccion(alojamientoDB.direccion.calle, alojamientoDB.direccion.altura , ciudad, alojamientoDB.direccion.lat, alojamientoDB.direccion.long)
        Object.assign(alojamiento, {
            id: alojamientoDB.id,
            anfitrion: await this.usuarioRepository.findById(alojamientoDB.anfitrion),
            nombre: alojamientoDB.nombre,
            descripcion: alojamientoDB.descripcion,
            precioPorNoche: alojamientoDB.precioPorNoche,
            moneda: Moneda.fromString(alojamientoDB.moneda),
            horarioCheckIn: alojamientoDB.horarioCheckIn,
            horarioCheckOut: alojamientoDB.horarioCheckOut,
            direccion: direccion,
            cantHuespedesMax: alojamientoDB.cantHuespedesMax,
            caracteristicas: alojamientoDB.caracteristicas ? alojamientoDB.caracteristicas.map(caracteristica => Caracteristica.fromString(caracteristica)) : [],
            reservas: alojamientoDB.reservas ? 
                await Promise.all(alojamientoDB.reservas.map(reservaDBAlojamiento => this.reservaRepository.findByIdWithAlojamiento(reservaDBAlojamiento.toString(), alojamiento)))
                : [],
            fotos: alojamientoDB.fotos ? alojamientoDB.fotos.map(foto => new Foto(foto.descripcion, foto.path)) : []
        })
        return alojamiento;
    }

    async findById(id) {
        const alojamientoDB = await this.model.findById(id);
        return this.deAlojamientoDB(alojamientoDB)
    }

    aAlojamientoDB(alojamiento) {
        const alojamientoDB = {
            id: alojamiento.id,
            anfitrion: alojamiento.anfitrion.id,
            nombre: alojamiento.nombre,
            descripcion: alojamiento.descripcion,
            precioPorNoche: alojamiento.precioPorNoche,
            moneda: alojamiento.moneda.toString(),
            horarioCheckIn: alojamiento.horarioCheckIn,
            horarioCheckOut: alojamiento.horarioCheckOut,
            direccion: {        
                    calle: alojamiento.direccion.calle,
                    altura: alojamiento.direccion.altura,
                    ciudad: alojamiento.direccion.ciudad.nombre,
                    lat: alojamiento.direccion.altura,
                    long: alojamiento.direccion.altura,
                    pais: alojamiento.direccion.ciudad.pais.nombre
            },
            cantHuespedesMax: alojamiento.cantHuespedesMax,
            caracteristicas: alojamiento.caracteristicas.map(caracteristica => caracteristica.toString()),
            reservas: alojamiento.reservas.map(reserva => reserva.id),
            fotos: alojamiento.fotos.map(foto => { return {descripcion: foto.descripcion, path: foto.path}})
        }
        return alojamientoDB

    }

    async actualizarAlojamiento(alojamiento) {
        const alojamientoActualizado = await this.model.findOneAndUpdate(
            {_id : alojamiento.id},
            this.aAlojamientoDB(alojamiento),
            { new: true, runValidators: true }
        )
        return alojamientoActualizado
    }
}
