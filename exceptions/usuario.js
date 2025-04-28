export class UsuarioInvalido extends Error {
    constructor(mensaje) {
      super(`Usuario invalido: ${mensaje}`);
    }
  }