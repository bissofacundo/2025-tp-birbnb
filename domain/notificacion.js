import { NotificacionInvalida } from "../exceptions/notificacion.js";

export class Notificacion {
    usuario
    mensaje
    

    constructor(usuario, mensaje) {
        if(!usuario || !mensaje) {
            throw new NotificacionInvalida(`El usuario y el mensaje son obligatorios, se recibio usuario: ${usuario} y mensaje: ${mensaje}`);
        }
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