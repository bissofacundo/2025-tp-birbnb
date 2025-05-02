export class AlojamientoInvalido extends Error {
    constructor(mensaje) {
      super(`Alojamiento invalido: ${mensaje}`);
    }
}

export class ReservaInvalida extends Error {
  constructor(mensaje) {
    super(`la reserva ingresada no cumple con los requisitos: ${mensaje}`)
  }
}