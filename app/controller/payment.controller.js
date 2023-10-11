// Importa las constantes 'HOST' y 'PAYPAL_API' desde el módulo "../config/config.js".
import { Console } from "console";
import { HOST, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from "../config/config.js";

// Importa el módulo 'axios' para realizar solicitudes HTTP.
import axios from "axios";


// Exporta una función llamada 'createOrder' que toma dos argumentos: 'req' y 'res', que representan la solicitud y la respuesta HTTP, respectivamente.
export const createOrder = async (req, res) => { //Inicio Funcion

    // Crea un objeto 'order' que representa una orden de compra con varios detalles.
    const order = {//Inicio Objeto
        intent: "CAPTURE",
        purchase_units : [
            {
                amount: {
                    currency_code: "USD", // Código de moneda en dólares estadounidenses
                    value: "100.00" // Valor del monto de la orden, en este caso, $100.00
                }
            },
        ],
        application_context: {
            brand_name: "Mi Tienda", // Nombre de la marca
            landing_page: "NO_PREFERENCE", // Página de destino preferida
            user_action: "PAY_NOW", // Acción del usuario para pagar ahora
            return_url: `${HOST}/capture-order`, // URL de retorno después de la captura de la orden
            cancel_url: `${HOST}/cancel-order`, // URL de cancelación de pago
        },
    }//Final Objeto

     // Crea un objeto 'params' de tipo 'URLSearchParams' para contener los parámetros de consulta para la autenticación de PayPal.
     const params = new URLSearchParams();
     params.append('grant_type', 'client_credentials');
 
     // Realiza una solicitud POST para obtener un token de acceso de PayPal.
     const { data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, { 
         auth: {
             username: PAYPAL_API_CLIENT, // Nombre de usuario para autenticación
             password: PAYPAL_API_SECRET // Contraseña para autenticación
         }
     });
  
    // Realiza una solicitud POST a la URL `${PAYPAL_API}/v2/checkout/orders` con los detalles de la orden.
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
    headers: {
        Authorization: `Bearer ${access_token}` // Agrega el token de acceso en los encabezados de autorización
    }
    });

    // Devuelve una respuesta JSON al cliente con los datos de la respuesta.
    return res.json(response.data);
 
} //Final funcion

// Exporta una función llamada 'captureOrder' que toma solicitudes (req) y respuestas (res).
export const captureOrder = async (req, res) => { // Inicio funcion

    // Obtiene el token de la consulta (query) de la solicitud HTTP.
    const { token } = req.query;

    // Realiza una solicitud POST a la API de PayPal para capturar una orden utilizando el token proporcionado.
    const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {}, {
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        }
    );
    // Imprime en la consola los datos de la respuesta de PayPal.
    console.log(response.data);

    // Envía una respuesta al cliente indicando que el pago ha sido realizado (esto puede necesitar ajustarse según la lógica de tu aplicación).
    return res.send('Payed');
} // Final funcion


// Exporta una función controladora llamada 'cancelOrder' que toma solicitudes (req) y respuestas (res)
export const cancelOrder = (req, res) => res.redirect('/')