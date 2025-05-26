
export class Caracteristica {
    constructor(nombre) {
        this.nombre = nombre;
    }

    static fromString(token) {
        console.log(token)
        console.log(Object.values(Caracteristica))
        return Object.values(Caracteristica).find(caracteristica => caracteristica.nombre.toUpperCase() === token);
    }

    toString() {
        return this.nombre.toUpperCase()
    }
}

Caracteristica.PISCINA = new Caracteristica("PISCINA");
Caracteristica.WIFI = new Caracteristica("WIFI");
Caracteristica.MASCOTAS_PERMITIDAS = new Caracteristica("MASCOTAS_PERMITIDAS");
Caracteristica.ESTACIONAMIENTO = new Caracteristica("ESTACIONAMIENTO");

