export class NotificacionInvalida extends Error {
    constructor(mensaje) {
      super(`Notificacion invalida: ${mensaje}`);
    }
  }

  