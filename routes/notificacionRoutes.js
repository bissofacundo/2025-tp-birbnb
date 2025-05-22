import { NotificacionController } from "../controllers/notificacionController.js";

export function registrarNotificacionRoutes(app, getController) {

    app.get("/notificaciones", (req, res) =>
        getController(NotificacionController).obtenerNotificaciones(req, res)
    );
    app.patch("/notificaciones/:id_notificacion", (req, res) =>
        getController(NotificacionController).marcarComoLeida(req, res)
    );
    
} 