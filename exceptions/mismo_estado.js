import { AppException } from "./app_exception.js";

export class MismoEstado extends AppException {
    constructor(mensaje) {
        super(mensaje, 409, "Mismo Estado")
    }
}