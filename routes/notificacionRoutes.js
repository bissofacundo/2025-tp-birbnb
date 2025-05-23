import { NotificacionController } from "../controllers/notificacionController.js";

export function registrarNotificacionRoutes(app, getController) {

/**
* @swagger
* /notificaciones:
*   get:
*     summary: Obtener notificaciones
*     description: Retorna todas las notificaciones, con opción de filtrar por id_usuario y leida .
*     parameters:
*       - in: query
*         name: id_usuario
*         schema:
*           type: string
*         required: false
*         description: ID del usuario para filtrar las notificaciones.
*       - in: query
*         name: leida
*         schema:
*           type: boolean
*         required: false
*         description: Filtrar por estado de lectura de la notificación.
*     responses:
*       200:
*         description: Lista de notificaciones
*       500:
*        description: Error al obtener las notificaciones
*/    
    app.get("/notificaciones", (req, res) =>
        getController(NotificacionController).obtenerNotificaciones(req, res)
    );

/**
* @swagger
* /notificaciones/{id_notificacion}:
*   patch:
*     summary: Marcar notificación como leída
*     description: Cambia el estado de la notificación a leída y setea la fechaLeida.
*     parameters:
*       - in: path
*         name: id_notificacion
*         schema:
*           type: string
*         required: true
*         description: ID de la notificación a actualizar.
*     responses:
*       200:
*        description: Notificación actualizada
*       400:
*        description: Error al marcar la notificación como leída
*/
    app.patch("/notificaciones/:id_notificacion", (req, res) =>
        getController(NotificacionController).marcarComoLeida(req, res)
    );
    
} 