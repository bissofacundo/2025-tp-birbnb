import { DireccionInvalida } from "../exceptions/direccion.js";

export class Pais {
    nombre

    constructor(nombre) {
        if(!nombre) {
            throw new DireccionInvalida(this.constructor.name,"El nombre del pais es obligatorio");
        }
        this.nombre = nombre;
    }
}

export class Ciudad {
    nombre
    pais

    constructor(nombre, pais) {
        if(!nombre || !pais) {
            throw new DireccionInvalida(this.constructor.name,`El nombre de la ciudad y el pais son obligatorios, se recibio nombre: ${nombre} y pais: ${pais}`);
        }
        this.nombre = nombre;
        this.pais = pais;
    }
}

export class Direccion {

    calle
    altura
    ciudad
    lat 
    long

    constructor(calle, altura, ciudad, lat, long) {
        this.calle = calle;
        this.altura = altura;
        this.ciudad = ciudad;
        this.lat = lat;
        this.long = long;
    }// TODO: revisar la posibilidad de calcular lat y long para evitar el ingreso manual 

    validarDatosIngresados(calle, altura, ciudad,lat,long) {
        if([calle,altura,ciudad,lat,long].some(p=> !p)) {
            throw new DireccionInvalida(this.constructor.name,`La calle, la altura, la ciudad, latitud y longitud son obligatorios, se recibio calle: ${calle}, altura: ${altura}, ciudad: ${ciudad}, latitud: ${lat} y longitud: ${long}`);
        }
        const rangoLat = 90;
        if(!this.validarRangoCoordenada(lat,rangoLat)){
            throw new DireccionInvalida(this.constructor.name,`La latitud debe estar entre -${rangoLat} y ${rangoLat}, se recibio: ${lat}`);
        }
        const rangoLong = 180;
        if(!this.validarRangoCoordenada(long,rangoLong)){
            throw new DireccionInvalida(this.constructor.name,`La longitud debe estar entre -${rangoLong} y ${rangoLong}, se recibio: ${long}`);
        }
    }

    validarRangoCoordenada(coordenada,rango) {
        return coordenada >= -rango && coordenada <= rango;
    }

}
