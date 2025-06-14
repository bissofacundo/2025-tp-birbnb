export function crearFiltro(req) { 
        return {
            page: req.query.page ? parseInt(req.query.page) : 1,
            limit: req.query.limit ? parseInt(req.query.limit) : 10,
            calle: req.query.calle,
            altura: req.query.altura,
            ciudad: req.query.ciudad,
            pais: req.query.pais,
            lat: req.query.lat,   //Es raro buscar por lat y long D:
            long: req.query.long,
            precioMin: req.query.precioMin,
            precioMax: req.query.precioMax,
            huespedes: req.query.huespedes,
            // Asumo este Endpoint GET /alojamientos?caracteristicas=PISCINA,WIFI,ESTACIONAMIENTO
            caracteristicas: req.query.caracteristicas ? req.query.caracteristicas.split(',').map(c=>c.toUpperCase()) //Separa los ids
            :null,
            } 
        
        };