import dotenv from "dotenv";
dotenv.config();

import express from "express"
import { configurarRutas } from "./routes/routes.js";
import { MongoDBClient } from "./config/db_config.js";
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';


import { AlojamientoController } from "./controllers/alojamientoController.js";
import { AlojamientoService } from "./services/alojamientoService.js";
import { AlojamientoRepository } from "./repositories/alojamiento_repository.js";

const puerto = 3000
const app = express()
app.use(express.json()) // es para que entienda/poder usar (req,res)

const swaggerFile = JSON.parse(fs.readFileSync('./documentation/swagger-output.json', 'utf-8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


MongoDBClient.connect(); 
const alojamientoRepo = new AlojamientoRepository();
const alojamientoService = new AlojamientoService(alojamientoRepo);
const alojamientoController = new AlojamientoController(alojamientoService); 


configurarRutas(app,{alojamientoController})

app.get("/healthCheck", (req, res) => {
  res.status(200).json({ status: 'La página funciona Correctamente :D' });
})

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}!`)
})