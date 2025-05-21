
import { toLower } from "lodash-es";
import { Alojamiento } from "../domain/alojamiento.js";
import { Direccion } from "../domain/direccion.js";
import { Pais } from "../domain/direccion.js";
import { Ciudad } from "../domain/direccion.js";
import { Caracteristica } from "../domain/enums/caracteristica.js";



export class AlojamientoController {

    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService;

        // Instancias de País
        const argentina = new Pais("Argentina");
        const brasil = new Pais("Brasil");

        // Instancias de Ciudad con País asociado
        const ciudad1 = new Ciudad("Buenos Aires", argentina);
        const ciudad2 = new Ciudad("Río de Janeiro", brasil);


        const direccion1 = new Direccion(
            "Mitre",
            123,
            ciudad1,
            -41.133472,
            -71.310278
        );
        const direccion2 = new Direccion(
            "Corrientes",
            456,
            ciudad2,
            -34.603722,
            -58.381592
        );


        const alojamiento1 = new Alojamiento(
            "juanperez",
            "José",
            "Cabaña en el bosque",
            13000.77,
            "ARS",
            "14:00",
            "11:00",
            direccion1,
            4,
            [Caracteristica.PISCINA,Caracteristica.WIFI],
            "foto1"
        );

        const alojamiento2 = new Alojamiento(
            "mariagonzalez",
            "Departamento céntrico",
            "Depto moderno cerca de todo",
            22000,
            "ARS",
            "15:00",
            "10:00",
            direccion1,
            2,
            [Caracteristica.PISCINA],
            "foto2"
        );

        const alojamiento3 = new Alojamiento(
            "lucasrodriguez",
            "Casa frente al mar",
            "Ideal para familias grandes, a pasos de la playa",
            30000,
            "ARS",
            "13:00",
            "12:00",
            direccion2,
            6,
            [Caracteristica.PISCINA],
            "foto1"
        );
        this.alojamientosMentira = [alojamiento1, alojamiento2, alojamiento3]
    }


    async findAll(req, res, next) {
        try {
            const filters = await this.crearFiltro(req)

            const alojamientos = await this.alojamientoService.findAll(this.alojamientosMentira, filters)

            console.log("Ejecute el FindALL")

            res.json(alojamientos);

        } catch (error) {
            next(error); // Manda el error a un middleWare
        }
    }

    async crearFiltro(req) {
        
        return {
            calle: req.query.calle?.toLowerCase(),
            altura: req.query.altura ? Number(req.query.altura) : null,
            ciudad: req.query.ciudad?.toLowerCase(),
            pais: req.query.pais?.toLowerCase(),
            lat: req.query.lat ? parseFloat(req.query.lat) : null,   //Es raro buscar por lat y long D:
            long: req.query.long ? parseFloat(req.query.long) : null,
            precioMin: req.query.precioMin ? parseFloat(req.query.precioMin) : null,
            precioMax: req.query.precioMax ? parseFloat(req.query.precioMax) : null,
            huespedes: req.query.huespedes ? Number(req.query.huespedes) : null,
            // Asumo este Endpoint GET /alojamientos?caracteristicas=PISCINA,WIFI,ESTACIONAMIENTO
            caracteristicas: req.query.caracteristicas? 
            req.query.caracteristicas.split(',').map(c => c.toUpperCase())
            : null, 
        };
    }
}