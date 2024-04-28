import { query } from "../../../lib/db";

// POST request handler for fetching recipes based on category and restriction
export async function POST(request) {
    try {
        const requestData = await request.json();
        const { categoryId, restrictionId } = requestData;

        const recipes = await query({
            query: `SELECT * 
                    FROM recipe 
                    JOIN diet_restrictions ON recipe.restriction_id = diet_restrictions.restriction_id 
                    WHERE catid = ? AND diet_restrictions.restriction_id = ?`,
            values: [categoryId, restrictionId],
        });

        const data = JSON.stringify(recipes);
        return new Response(data, { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

