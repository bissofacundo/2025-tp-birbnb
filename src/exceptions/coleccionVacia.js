import { AppException } from "./app_exception.js";

export class ColeccionVacia extends AppException {
    constructor(mensaje) {
        super(mensaje, 503, "Coleccion Vacia")
    }
}