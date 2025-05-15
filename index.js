import dotenv from "dotenv";
dotenv.config(); 

import express from "express"
import { MongoDBClient } from "./config/db_config.js";

const puerto = 3000
const app = express()
app.use(express.json())

// eslint-disable-next-line no-undef
MongoDBClient.connect(process.env)

app.get("/healthCheck", (req, res) => {
  res.status(200).json({ status: 'La página funciona Correctamente :D' });
})

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}!`)
})