import express from "express" 
import { configurarRutas } from "../../../routes/routes.js"

export const configurarServerPrueba = (app, reservaController) => {
    app.use(express.json())
    configurarRutas(app, {reservaController})
}