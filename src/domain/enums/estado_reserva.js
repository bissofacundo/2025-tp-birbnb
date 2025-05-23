import { values } from "lodash-es";

export class Estado {
    constructor(nombre) {
        this.nombre = nombre;
    }

    toString() {
        return this.nombre.toUpperCase()
    }

    static fromString(token) {
        return values(Estado).find(estado => estado.nombre.toUpperCase() === token.toUpperCase());
    }

}

Estado.PENDIENTE = new Estado("Pendiente");
Estado.CONFIRMADA = new Estado("Confirmada");
Estado.CANCELADA = new Estado("Cancelada");