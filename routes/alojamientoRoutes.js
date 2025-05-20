
export function registerAlojamientoRoutes(app,alojamientoController){

    app.get("/alojamientos", (req, res, next) => 
        alojamientoController.findAll(req, res, next)
        );
        //Voy a usar las querys para filtrar ?algo=valor&otracondicion
}