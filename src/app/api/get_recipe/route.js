import { query } from "../../../lib/db";

export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM recipe JOIN diet_restrictions ON recipe.restriction_id =  diet_restrictions.restriction_id",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}

