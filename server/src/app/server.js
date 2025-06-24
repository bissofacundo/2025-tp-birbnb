import bodyParser from "body-parser";
import {configureRoutes} from "./routes.js";
import { handlerException } from "../exceptions/handlerExceptionYMapper/handlerException.js";
import cors from "cors"

export const startServer = (app, port, appContext) => {
  app.use(bodyParser.json())
  
  app.get('/healthCheck', (req, res) => {
    res.status(200).json({mensaje:'Todo marcha bien!'})
  })
  app.use(
    cors({
      origin: "*",
      methods: "*",
      allowedHeaders: "*"
    })
  )
  configureRoutes(app, appContext)
  app.use(handlerException)
  
  app.listen(port, () => {
    console.log(`Servidor de Birbnb escuchando en el puerto: ${port}`)
  })

  return app;
}