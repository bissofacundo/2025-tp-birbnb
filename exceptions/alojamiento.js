import { AppException } from "./app_exception.js";

export class AlojamientoInvalido extends AppException {
    constructor(mensaje) {
      super(`Alojamiento invalido: ${mensaje}`, 400, "Alojamiento creado invalido");
    }
}

export class ReservaInvalida extends AppException {
  constructor(mensaje) {
    super(`la reserva ingresada no cumple con los requisitos: ${mensaje}`, 400, "Reserva creada invalida")
  }
}