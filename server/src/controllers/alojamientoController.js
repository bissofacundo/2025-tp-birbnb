import {ValidacionInvalida} from "../exceptions/datosInvalidos.js"
import { ErrorDeHandler } from "../exceptions/handlerExceptionYMapper/errorDeHandler.js"
import { MapperError } from "../exceptions/handlerExceptionYMapper/mapperErrores.js"


const mapperComunErroresEndpoints = () => {
    const mapperError = new MapperError()
    mapperError.agregarErrorStatusCode(ValidacionInvalida, 400)
    return mapperError
}


export class AlojamientoController {
    alojamientoService
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService;
    }


    async findAll(req, res, next) {
        const mapperError = mapperComunErroresEndpoints()
        try {
            const filters = this.crearFiltro(req)
            const alojamientos = await this.alojamientoService.findAll(filters)
            res.status(200).json({
                pagina: filters.page,
                limite: filters.limit,
                total: alojamientos.length,
                resultados: alojamientos});
        } catch (error) {
            next(new ErrorDeHandler(error, mapperError.buscarStatusCodeEnMapper(error)))
        }
    }

    crearFiltro(req) {
        if(req.query.page && isNaN(parseInt(req.query.page))) {
            throw new ValidacionInvalida('La pagina debe ser un numero')
        }

        if(req.query.limit && isNaN(parseInt(req.query.limit))) {
            throw new ValidacionInvalida('El limit debe ser un numero')
        }

        if(req.query.altura && isNaN(parseInt(req.query.altura))) {
            throw new ValidacionInvalida('El limit debe ser un numero')
        }

        if(req.query.lat && isNaN(Number(req.query.lat))) {
            throw new ValidacionInvalida('La latitud debe ser un numero')
        }

        if(req.query.long && isNaN(Number(req.query.long))) {
            throw new ValidacionInvalida('La longitud debe ser un numero')
        }

        if(req.query.precioMax && isNaN(Number(req.query.precioMax))) {
            throw new ValidacionInvalida('El precio maximo debe ser un numero')
        }

        if(req.query.precioMin && isNaN(Number(req.query.precioMin))) {
            throw new ValidacionInvalida('El precio minimo debe ser un numero')
        }

        if(req.query.huespedes && isNaN(parseInt(req.query.huespedes))) {
            throw new ValidacionInvalida('La cantidad de huespedes minima debe ser un numero')
        }


        return {
            page: req.query.page ? (parseInt(req.query.page)-1) : 1,
            limit: req.query.limit ? parseInt(req.query.limit) : 10,
            calle: req.query.calle,
            altura: req.query.altura,
            ciudad: req.query.ciudad,
            pais: req.query.pais,
            lat: req.query.lat,   //Es raro buscar por lat y long D:
            long: req.query.long,
            precioMin: req.query.precioMin,
            precioMax: req.query.precioMax,
            huespedes: req.query.huespedes,
            // Asumo este Endpoint GET /alojamientos?caracteristicas=PISCINA,WIFI,ESTACIONAMIENTO
            caracteristicas: req.query.caracteristicas ? req.query.caracteristicas.split(',').map(c => c.toUpperCase()) //Separa los ids
                : null,
        }

    };
}