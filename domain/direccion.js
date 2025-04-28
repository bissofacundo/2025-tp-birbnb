export class Pais {
    nombre

    constructor(nombre) {
        this.nombre = nombre;
    }
}

export class Ciudad {
    nombre
    pais

    constructor(nombre, pais) {
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
    }
}
