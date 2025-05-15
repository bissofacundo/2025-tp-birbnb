
export const configurarRutasReserva = (app, reservaController) => {
    app.post('/reservas', reservaController.crearReserva.bind(reservaController))
}