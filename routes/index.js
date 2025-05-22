import { registrarNotificacionRoutes } from './notificacionRoutes.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

export function configureRoutes(app, getController) {
  registrarNotificacionRoutes(app, getController);
  
  app.get("/healthCheck", (req, res) => {
    res.status(200).json({ status: 'La página funciona Correctamente :D' });
  })
  
  const swaggerFile = JSON.parse(fs.readFileSync('./documentation/swagger-output.json', 'utf-8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

} 