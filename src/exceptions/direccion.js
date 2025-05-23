export class DireccionInvalida extends Error {
    constructor(entidad,mensaje) {
      super(`Error ${entidad}: ${mensaje}`);
    }
  }