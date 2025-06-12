export class AlojamientoController {
    alojamientoService
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService;
    }


    async findAll(req, res, next) {
        try {
            const filters = await this.crearFiltro(req)

            const alojamientos = await this.alojamientoService.findAll(filters)
            res.status(200).json({
                pagina: filters.page,
                limite: filters.limit,
                total: alojamientos.length,
                resultados: alojamientos});
        } catch (error) {
            console.error('Error al buscar alojamientos:', error);
            res.status(500).json({
                error: 'Error interno del servidor',
                detalle: error.message
            });
        }
    }

    crearFiltro(req) {
        return {
            page: req.query.page ? (parseInt(req.query.page)-1) : 1,
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
            caracteristicas: req.query.caracteristicas ? req.query.caracteristicas.split(',').map(c => c.toUpperCase()) //Separa los ids
                : null,
        }

    };
}