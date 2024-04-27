import { query } from "../../../lib/db";

export async function POST(request) {
    try {
        const { recipeName, categoryId } = await request.json();
        // Adjust the query to insert the categoryId into the recipe table
        const insertRecipe = await query({
            query: "INSERT INTO recipe (recipename, catid) VALUES (?, ?)",
            values: [recipeName, categoryId],
        });
        const result = insertRecipe.affectedRows;
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
