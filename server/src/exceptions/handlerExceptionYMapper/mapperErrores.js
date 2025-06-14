
export class MapperError {
    mapperErrores
    constructor() {
        this.mapperErrores = []
    }

    agregarErrorStatusCode(claseError, statusCode) {
        this.mapperErrores.push({claseError, statusCode})
    }

    buscarStatusCodeEnMapper(error) {
        const errorStatus = this.mapperErrores.find(errorCodigo => error instanceof errorCodigo.claseError)
        return errorStatus ? errorStatus.statusCode : errorStatus
    }
}