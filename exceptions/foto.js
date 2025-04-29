export class FotoInvalida extends Error {
    constructor(mensaje) {
      super(`Foto invalida: ${mensaje}`);
    }
}