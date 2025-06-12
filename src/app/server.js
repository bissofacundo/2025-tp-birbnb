import bodyParser from "body-parser";
import {configureRoutes} from "./routes.js";
import { handlerException } from "../exceptions/handlerException.js";

export const startServer = (app, port, appContext) => {
  app.use(bodyParser.json())
  
  app.get('/healthCheck', (req, res) => {
    res.status(200).json({mensaje:'Todo marcha bien!'})
  })

  configureRoutes(app, appContext)
  app.use(handlerException)
  app.listen(port, () => {
    console.log(`Servidor de Birbnb escuchando en el puerto: ${port}`)
  })

  return app;
}