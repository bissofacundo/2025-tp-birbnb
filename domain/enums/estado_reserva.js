export class Estado {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

Estado.PENDIENTE = new Estado("Pendiente");
Estado.CONFIRMADA = new Estado("Confirmada");
Estado.CANCELADA = new Estado("Cancelada");