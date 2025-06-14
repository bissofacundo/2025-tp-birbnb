import { AppException } from "./appException.js";

export class MismoEstado extends AppException {
    constructor(mensaje) {
        super(mensaje, "Mismo Estado")
    }
}