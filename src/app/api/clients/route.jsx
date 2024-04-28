import { query } from "../../../lib/db";

export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM client",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}


export async function DELETE(request) {
    try {
        const { clientId } = await request.json(); // Ensure that categoryId is extracted correctly from the request body
        const deleteUser = await query({
            query: "DELETE FROM client WHERE id = ?",
            values: [clientId],
        });
        const result = deleteUser.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            id: categoryId, // Ensure that you use categoryId here instead of undefined 'id'
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            error: error.message // Include the error message for debugging purposes
        }));
    }
}


