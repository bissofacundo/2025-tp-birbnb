export class Notificacion {
    usuario
    mensaje
    fecha_alta

    constructor(usuario, mensaje) {
        this.usuario = usuario; 
        this.mensaje = mensaje; 
        this.fecha_alta = new Date();
        this.leida = false;
        this.fecha_leida = null;
    }

    marcarComoLeida() {
        this.leida = true;
        this.fecha_leida = new Date();
    }
}