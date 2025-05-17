export class EntidadNoEncontrada extends Error {
    constructor(mensaje) {
        super(`Error: ${mensaje}`)
    }
}