import { AppException } from "./app_exception.js";

export class ValidacionInvalida extends AppException {
    constructor(mensaje) {
        super(mensaje, 400, "Error de validacion");
    }
}

