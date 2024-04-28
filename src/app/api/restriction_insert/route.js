import { query } from "../../../lib/db";

export async function POST(request) {
    try {
        const { restriction, description } = await request.json();
        // Adjust the query to insert the categoryId into the recipe table
        const insertRestriction = await query({
            query: "INSERT INTO diet_restrictions (restriction, description) VALUES (?, ?)",
            values: [restriction, description],
        });
        const result = insertRestriction.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        return new Response(JSON.stringify({
            message: message,
            status: 200,
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
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
