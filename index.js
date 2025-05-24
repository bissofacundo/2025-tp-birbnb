import express from "express"
import {startServer} from "./src/app/server.js";
import {buildAppContext} from "./src/app/context.js";
import { MongoDBClient } from "./src/app/db.js";
import dotenv from "dotenv";

dotenv.config(); 

const puerto = 3000
const app = express()
app.use(express.json())

MongoDBClient.connect()

const notificacionService = new NotificacionService(NotificacionRepository)
const usuariosService = new UsuariosService(UsuariosRepository, notificacionService)
const reservaService = new ReservaService(ReservaRepository, usuariosService)

const usuariosController = new UsuariosController(UsuariosRepository)
const reservaController = new ReservaController(reservaService)

MongoDBClient.connect(process.env)

const appContext = buildAppContext()

startServer(app, puerto, appContext)
