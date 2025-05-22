import { NotificacionInvalida } from '../../exceptions/notificacion.js';

export class Notificacion {
    usuario
    mensaje
    fechaAlta
    leida
    fechaLeida

    constructor(usuario, mensaje) {
        if(!usuario || !mensaje) {
            throw new NotificacionInvalida(`El usuario y el mensaje son obligatorios, se recibio usuario: ${usuario} y mensaje: ${mensaje}`);
        }
        this.usuario = usuario; 
        this.mensaje = mensaje; 
        this.fechaAlta = new Date();
        this.leida = false;
        this.fechaLeida = null;
    }

    aniadirMotivo(motivo){
        if(motivo.length > 0){
            this.mensaje = "Motivo: ".concat(motivo) 
        }
    }

    marcarComoLeida() {
        this.leida = true;
        this.fechaLeida = new Date();
    }


}