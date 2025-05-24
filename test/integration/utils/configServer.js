import express from "express" 

export const configurarServerPrueba = (app, reservaController) => {
    app.use(express.json())
    app.post('/reservas', reservaController.crearReserva.bind(reservaController))
}