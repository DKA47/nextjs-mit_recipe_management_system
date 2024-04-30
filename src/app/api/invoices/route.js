import { query } from "../../../lib/db";

// export async function GET(request) {
//     const users = await query({
//         query: "SELECT * FROM my_subs Where id = ?",
//         values: [1],
//     });

//     let data = JSON.stringify(users);
//     return new Response(data, {
//         status: 200,
//     });
// }

// POST request handler for fetching recipes based on category and restriction
export async function POST(request) {
    try {
        const requestData = await request.json();
        const { invoiceId } = requestData;

        const recipes = await query({
            query: `SELECT * FROM my_subs Where id = ?`,
            values: [invoiceId],
        });

        const data = JSON.stringify(recipes);
        return new Response(data, { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}



