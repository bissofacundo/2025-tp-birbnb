



export const handlerException = ( err , req, res, next) => {
    const {objError, statusCode} = err
     if(!statusCode) {
        console.log(objError)
        res.status(500).json({error: "Error en el servidor"})
    } else {
        res.status(statusCode).json({error: objError.message, tipoError: objError.nombreError })
    }
}