import { configurarRutasReserva } from "./reserva_routes.js"
import { configurarRutasSwagger } from "./swagger_routes.js"

export const configurarRutas =  (app, {reservaController}) => {
    configurarRutasReserva(app, reservaController)
    configurarRutasSwagger(app)
} 