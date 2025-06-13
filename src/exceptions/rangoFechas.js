import { AppException } from "./appException.js";

export class RangoFechasInvalido extends AppException {
    constructor(mensaje) {
      super(`Rango de fechas invalido: ${mensaje}`, "Rango de fechas creado invalido");
    }
  }

  