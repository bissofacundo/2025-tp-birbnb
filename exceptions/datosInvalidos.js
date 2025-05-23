import { AppException } from "./appException.js";

export class ValidacionInvalida extends AppException {
    constructor(mensaje) {
        super(mensaje, 400, "Error de validacion");
    }
}

