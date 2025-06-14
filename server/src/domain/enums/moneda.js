import { values } from "lodash-es";

export class Moneda  {
    nombre;

    constructor(moneda){
        this.nombre = moneda
    }

    static fromString(token){
        return values(Moneda).find(mon => mon.nombre.toUpperCase() === token)
    }

    toString() {
        return this.nombre.toUpperCase()
    }
}

Moneda.DOLAR_USA = new Moneda("DOLAR_USA")
Moneda.PESO_ARG = new Moneda ("PESO_ARG")
Moneda.REALES = new Moneda("REALES")