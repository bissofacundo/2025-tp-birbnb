export const configureRoutes = (app, {reservaController, usuarioController}) => {
    app.put("/reservas/:id", reservaController.modificarReserva.bind(reservaController))
    app.post('/reservas', reservaController.crearReserva.bind(reservaController))
    app.get('/usuarios', usuarioController.getUsuarios.bind(usuarioController))
}