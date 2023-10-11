// Importa el módulo 'config' del paquete 'dotenv'
import { config } from "dotenv";

// Carga las variables de entorno desde un archivo .env
config();

// Exporta una constante llamada 'PORT' con el valor 3000
export const PORT = 3000;

// Exporta una constante llamada 'HOST' que combina 'http://localhost:' con el valor de 'PORT'
export const HOST = 'http://localhost:' + PORT;

// Importa el valor de la variable de entorno PAYPAL_API_CLIENT y lo asigna a la constante PAYPAL_API_CLIENT
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;

// Importa el valor de la variable de entorno PAYPAL_API_SECRET y lo asigna a la constante PAYPAL_API_SECRET
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;

// Exporta una constante llamada 'PAYPAL_API' con el valor 'https://api-m.sandbox.paypal.com' el cual se utiliza para construir y enviar solicitudes a la API de PayPal
export const PAYPAL_API = 'https://api-m.sandbox.paypal.com';