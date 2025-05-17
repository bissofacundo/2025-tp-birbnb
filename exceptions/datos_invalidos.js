export class DatoFaltanteException extends Error {
    constructor(mensaje) {
        super(`Error: ${mensaje}`);
    }
}

export class DatoErroneoException extends Error {
    constructor(mensaje) {
        super(`Error: ${mensaje}`);
    }
}