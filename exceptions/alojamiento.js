export class AlojamientoInvalido extends Error {
    constructor(mensaje) {
      super(`Alojamiento invalido: ${mensaje}`);
    }
}