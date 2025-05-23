export class RangoFechasInvalido extends Error {
    constructor(mensaje) {
      super(`Rango de fechas invalido: ${mensaje}`);
    }
  }

  