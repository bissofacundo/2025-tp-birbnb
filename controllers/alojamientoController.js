
import { toLower } from "lodash-es";
import { Alojamiento } from "../domain/alojamiento.js";




export class AlojamientoController{

    constructor(alojamientoService) {
    this.alojamientoService = alojamientoService;

    const alojamiento1 = new Alojamiento(
    "juanperez",
    "Cabaña en el bosque",
    "Cabaña en el bosque",
    13000,
    "ARS",
    "14:00",
    "11:00",
    "Camino del Bosque 123, Bariloche",
    4,
    "ewewewewewe",
    "43434343434343"
    );
/*
    alojamiento2 = new Alojamiento(
    "mariagonzalez",
    "Departamento céntrico",
    "Depto moderno cerca de todo",
    22000,
    "ARS",
    "15:00",
    "10:00",
    "Av. Corrientes 2345, CABA",
    2,
    );

    alojamiento3 = new Alojamiento(
    "lucasrodriguez",
    "Casa frente al mar",
    "Ideal para familias grandes, a pasos de la playa",
    30000,
    "ARS",
    "13:00",
    "12:00",
    "Costanera 456, Mar del Plata",
    6,
    );*/
    this.alojamientosMentira = [alojamiento1]
    console.log("hola");
    console.log(typeof(alojamiento1.cantHuespedesMax));
    console.log(this.alojamientosMentira)
}
     

    async findAll(req,res,next){
        try {
            const filters = { // filtros deben ser: ubicación, precio, huéspedes, características.
                ubicacion : req.query.ubicacion ?.toLowerCase(),
                precio    : req.query.precio ? parseFloat(req.query.precio) : null ,
                huespedes : req.query.huespedes ? Number(req.query.huespedes) : null ,
                //Falta implementar Caracteristicas, son muchas
            };
            console.log(typeof(filters.huespedes))
            console.log(filters.huespedes)
            console.log(this.alojamientosMentira[0].cantHuespedesMax)
            console.log(this.alojamientosMentira[0].cantHuespedesMax >= filters.huespedes)
            let resultados = this.alojamientosMentira.filter(aloj =>{
                const coincideCantHuespedes = filters.huespedes ? 
                aloj.cantHuespedesMax >= filters.huespedes
                :true; 
                return coincideCantHuespedes;
            });
            const alojamientos = await this.alojamientoService.muchosAlojamientoADTO(resultados)
            console.log("Ejecute el FindALL")
            res.json(alojamientos);
        } catch (error) {
            next(error); // Manda el error a un middleWare
        }
    }
}