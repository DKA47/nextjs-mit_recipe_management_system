import { query } from "../../../lib/db";

export async function POST(request) {
    try {
        const { restrictionId, recipeName, categoryId } = await request.json();
        // Adjust the query to insert the categoryId into the recipe table
        const insertRecipe = await query({
            query: "INSERT INTO recipe (restriction_id,recipename, catid) VALUES (?, ?, ?)",
            values: [restrictionId, recipeName, categoryId],
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
