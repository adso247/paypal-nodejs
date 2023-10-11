// Importa el módulo 'Router' del paquete 'express'
import { Router } from "express";

// Importa las funciones controladoras desde 'payment.controller.js'
import { 
    cancelOrder, 
    captureOrder, 
    createOrder 
} from '../controller/payment.controller.js'

// Crea una instancia de un enrutador de Express
const router = Router();

// Define una ruta GET '/create-order' que llama a la función 'createOrder' al recibir una solicitud
router.post("/create-order", createOrder );

// Define una ruta GET '/capture-order' que llama a la función 'captureOrder' al recibir una solicitud
router.get("/capture-order", captureOrder);

// Define una ruta GET '/cancel-order' que llama a la función 'cancelOrder' al recibir una solicitud
router.get("/cancel-order", cancelOrder);

// Exporta el enrutador para que pueda ser utilizado en otros archivos
export default router;