// import express from "express"
// import { CambiarEstadoController } from "./controllers/cambiarEstadoController.js"
// import "dotenv/config.js"
// import { z } from "zod"
// import { idTransform } from "./transformaciones.js"
// import { NotificationController } from "./controllers/notificationController.js"

// const app = express()

// app.put("/reservas/:id/estado", CambiarEstadoController.cambiarEstado)

// app.get("/healthCheck", (req, res) => {
//   res.status(200).json({ status: 'La página funciona Correctamente :D' });
// })

// // endpoint para notificaciones
// app.get("/notificaciones", NotificationController.obtenerNotificaciones)

// app.patch("/notificaciones/:id_notificacion", NotificationController.marcarComoLeida)


// const puerto = process.env.SERVER_PORT ?? 3000
// app.listen(puerto, () => {
//   console.log(`Servidor escuchando en el puerto ${puerto}!`)
// })

import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import { Server } from './server/server.js';
import { MongoDBClient } from "./config/database.js";

import { UsuarioRepository } from "./models/repositories/usuarioRepository.js";

import { NotificacionRepository } from "./models/repositories/notificacionRepository.js";
import { NotificacionService } from "./services/notificacionService.js";
import { NotificacionController } from "./controllers/notificacionController.js";


const app = express();
const port = process.env.SERVER_PORT ?? 3000;
const server = new Server(app, port);

MongoDBClient.connect();

// Configuración de dependencias

const repositorioUsuario = new UsuarioRepository();

const repositorioNotificacion = new NotificacionRepository();
const notificacionService = new NotificacionService(repositorioNotificacion);
const notificacionController = new NotificacionController(notificacionService);

// Registro de controladores en el servidor
server.setController(NotificacionController, notificacionController);

// Configuración de rutas y lanzamiento
server.configureRoutes();
server.launch();