import { AppException } from "./appException.js";

export class ColeccionVacia extends AppException {
    constructor(mensaje) {
        super(mensaje, "Coleccion Vacia")
    }
}