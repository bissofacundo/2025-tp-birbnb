
export function registerAlojamientoRoutes(app, alojamientoController) {


    app.get("/alojamientos", (req, res, next) => {
        /* #swagger.parameters['page'] = { 
    in: 'query', 
    description: 'Número de página para paginación', 
    type: 'integer' 
} */

/* #swagger.parameters['limit'] = { 
    in: 'query', 
    description: 'Cantidad máxima de resultados por página', 
    type: 'integer' 
} */

/* #swagger.parameters['calle'] = { 
    in: 'query', 
    description: 'Nombre de la calle del alojamiento', 
    type: 'string' 
} */

/* #swagger.parameters['altura'] = { 
    in: 'query', 
    description: 'Altura de la calle del alojamiento', 
    type: 'integer' 
} */

/* #swagger.parameters['ciudad'] = { 
    in: 'query', 
    description: 'Nombre de la ciudad del alojamiento', 
    type: 'string' 
} */

/* #swagger.parameters['pais'] = { 
    in: 'query', 
    description: 'Nombre del país del alojamiento', 
    type: 'string' 
} */

/* #swagger.parameters['lat'] = { 
    in: 'query', 
    description: 'Latitud geográfica del alojamiento (no es común filtrar por esto)', 
    type: 'number' 
} */

/* #swagger.parameters['long'] = { 
    in: 'query', 
    description: 'Longitud geográfica del alojamiento (no es común filtrar por esto)', 
    type: 'number' 
} */

/* #swagger.parameters['huespedes'] = { 
    in: 'query', 
    description: 'Cantidad mínima de huéspedes que debe soportar el alojamiento', 
    type: 'integer' 
} */

/* #swagger.parameters['caracteristicas'] = { 
    in: 'query', 
    description: 'Lista de características requeridas, separadas por comas (ej: WIFI,PISCINA)', 
    type: 'string' 
} */

        alojamientoController.findAll(req, res, next)
    });
    //Voy a usar las querys para filtrar ?algo=valor&otracondicion
}




