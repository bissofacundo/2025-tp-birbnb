import { AppException } from "./appException.js";

export class ValidacionInvalida extends AppException {
    constructor(mensaje) {
        super(mensaje, "Error de validacion");
    }
}

