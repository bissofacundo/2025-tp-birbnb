export class Estado {
    constructor(nombre) {
        this.nombre = nombre;
    }

    static fromString(token) {
        return values(Estado).find(estado => estado.nombre.toUpperCase() === token);
    }

}

Estado.PENDIENTE = new Estado("Pendiente");
Estado.CONFIRMADA = new Estado("Confirmada");
Estado.CANCELADA = new Estado("Cancelada");