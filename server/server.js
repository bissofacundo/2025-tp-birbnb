import express from "express";
import { configureRoutes } from "../routes/index.js";

export class Server {
  #controllers = {};
  #app;

  constructor(app, port = 3000) {
    this.#app = app;
    this.port = port;
    this.#app.use(express.json());
  }

  get app() {
    return this.#app;
  }

  setController(controllerClass, controller) {
    this.#controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Controlador no encontrado para la ruta proporcionada.");
    }
    return controller;
  }

  configureRoutes() {
    configureRoutes(this.app, this.getController.bind(this));
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log("El servidor esta corriendo en el puerto: " + this.port);
    });
  }
}