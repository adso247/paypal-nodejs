// Importa el módulo 'express' para crear una aplicación web
import express from 'express';

// Importa el módulo 'path' para trabajar con rutas de archivos y directorios
import path from 'path';

// Importa el enrutador de rutas de pago desde un archivo llamado 'payment.routes.js'
import paymentRoutes from './app/routes/payment.routes.js';

// Importa la constante 'PORT' desde un archivo de configuración llamado 'config.js'
import { PORT } from './app/config/config.js';

// Crea una instancia de la aplicación Express
const app = express();

// Utiliza el enrutador de rutas de pago en la aplicación
app.use(paymentRoutes);

// Configura Express para servir archivos estáticos desde la carpeta 'app/view'
app.use(express.static(path.resolve('app/view')));

// Hace que la aplicación escuche en el puerto especificado por la constante 'PORT'
app.listen(PORT);

// Imprime un mensaje en la consola indicando que el servidor está escuchando en el puerto 'PORT'
console.log('Server on port', PORT);