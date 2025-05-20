
import { toLower } from "lodash-es";
import { Alojamiento } from "../domain/alojamiento.js";




export class AlojamientoController{

    constructor(alojamientoService) {
    this.alojamientoService = alojamientoService;

    const alojamiento1 = new Alojamiento(
    "juanperez",
    "José",
    "Cabaña en el bosque",
    13000.77,
    "ARS",
    "14:00",
    "11:00",
    "Camino del Bosque 123, Bariloche",
    4,
    ["cara1"],
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
    "Av. Corrientes 2345, CABA",
    2,
    ["cara2"],
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
    "Costanera 456, Mar del Plata",
    6,
    ["cara1"],
    "foto1"
    );
    this.alojamientosMentira = [alojamiento1,alojamiento2,alojamiento3]
}
     

    async findAll(req,res,next){
        try {
            const filters = { // filtros deben ser: ubicación, precio, huéspedes, características.
                ubicacion : req.query.ubicacion ?.toLowerCase(),
                precioMin : req.query.precioMin ? parseFloat(req.query.precioMin) : null ,
                precioMax : req.query.precioMax ? parseFloat(req.query.precioMax) : null ,
                huespedes : req.query.huespedes ? Number(req.query.huespedes) : null ,
                caracteristicas : req.query.caracteristicas ?.toLowerCase(),
            };
    
            const alojamientos = await this.alojamientoService.findAll(this.alojamientosMentira,filters)
            console.log("Ejecute el FindALL")
            res.json(alojamientos);
        } catch (error) {
            next(error); // Manda el error a un middleWare
        }
    }
}