import { registrarNotificacionRoutes } from './notificacionRoutes.js';

export function configureRoutes(app, getController) {
  registrarNotificacionRoutes(app, getController);

  app.get("/healthCheck", (req, res) => {
   res.status(200).json({ status: 'La página funciona Correctamente :D' });
 })
} 