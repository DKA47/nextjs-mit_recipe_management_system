import { query } from "../../../lib/db";

export async function POST(request) {
    try {
        const { rating, review, recipeId } = await request.json();
        const updateReview = await query({
            query: "INSERT INTO review (rate, review, recipd) VALUES (?,?,?)",
            values: [rating, review, recipeId],
        });
        const result = updateReview.affectedRows;
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

