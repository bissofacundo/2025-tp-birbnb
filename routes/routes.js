import { configurarRutasReserva } from "./reservaRoutes.js"
import { configurarRutasSwagger } from "./swaggerRoutes.js"

export const configurarRutas =  (app, {reservaController}) => {
    configurarRutasReserva(app, reservaController)
    configurarRutasSwagger(app)
} 