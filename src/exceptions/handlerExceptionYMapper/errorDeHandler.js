export class ErrorDeHandler {
    objError
    statusCode
    constructor(error, statusCode) {
        this.objError = error
        this.statusCode = statusCode
    }
}