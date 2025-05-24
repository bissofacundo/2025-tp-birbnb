import {registerAlojamientoRoutes} from "./alojamientoRoutes.js"

export const configurarRutas =  (app, {alojamientoController}) => {
    registerAlojamientoRoutes(app,alojamientoController)
} 