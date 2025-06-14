import { AppException } from "./appException.js";

export class AlojamientoInvalido extends AppException {
    constructor(mensaje) {
      super(`Alojamiento invalido: ${mensaje}`, "Alojamiento creado invalido");
    }
}

export class ReservaInvalida extends AppException {
  constructor(mensaje) {
    super(`la reserva ingresada no cumple con los requisitos: ${mensaje}`, "Reserva creada invalida")
  }
}