import { AppException } from "./app_exception.js";

export class EntidadNoEncontrada extends AppException {
    constructor(mensaje) {
        super(mensaje, 404, "Entidad no encontrada")
    }
}