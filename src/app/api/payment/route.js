// Import the query function from your database module
import { query } from "../../../lib/db";

export async function POST(request) {
    try {
        // Parse the JSON body from the request
        const { paymentIntent } = await request.json();

        // Extract relevant fields from the payment intent object
        const { id, amount, currency, capture_method, client_secret, confirmation_method, created, livemode, payment_method, status } = paymentIntent;

        // Insert payment intent details into the database
        const insertPaymentIntent = await query({
            query: "INSERT INTO payments (id, amount, currency, capture_method, client_secret, confirmation_method, created, livemode, payment_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            values: [id, amount, currency, capture_method, client_secret, confirmation_method, created, livemode, payment_method, status],
        });

        // Check if the insertion was successful
        const result = insertPaymentIntent.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }

        // Return response
        return new Response(JSON.stringify({
            message: message,
            status: 200,
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        // Return error response
        return new Response(JSON.stringify({
            status: 500,
            error: error.message
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
