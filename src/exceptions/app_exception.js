export class AppException extends Error {
    status
    nombreError
    
    constructor(mensaje, status, nombreError) {
        super(`Error: ${mensaje}`);
        this.status = status
        this.nombreError = nombreError
    }
}