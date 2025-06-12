import { AppException } from "./appException.js";

export class ColeccionVacia extends AppException {
    constructor(mensaje) {
        super(mensaje, 406, "Coleccion Vacia")
    }
}