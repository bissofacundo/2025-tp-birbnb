
import { toLower } from "lodash-es";
import { Alojamiento } from "../domain/alojamiento.js";
import { Direccion } from "../domain/direccion.js";
import { Pais } from "../domain/direccion.js";
import { Ciudad } from "../domain/direccion.js";
import { Caracteristica } from "../domain/enums/caracteristica.js";



export class AlojamientoController {
    alojamientoService
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService;
    }


    async findAll(req, res, next) {
        try {
            const filters = await this.crearFiltro(req)

            const alojamientos = await this.alojamientoService.findAll(filters);
            res.json(alojamientos);
        } catch (error) {
            next(error);
        }
    }
    //Falta implementar bien
    async create(req, res, next) {
        try {
            const nuevo = await this.alojamientoService.create(req.body);
            res.status(201).json(nuevo);
        } catch (error) {
            next(error);
        }
    }

    async crearFiltro(req) {
        return {
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
            caracteristicas: req.query.caracteristicas ? req.query.caracteristicas.split(',').map(c=>c.toUpperCase()) //Separa los ids
            :null,
            } 
        
        };
    }