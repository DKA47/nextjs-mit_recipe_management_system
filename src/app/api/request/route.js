import { query } from "../../../lib/db";

export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM request",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {
    try {
        const { recipe, description } = await request.json();
        const updateRequest = await query({
            query: "INSERT INTO request (RecipeTypeName, description ) VALUES (?,?)",
            values: [recipe, description],
        });
        const result = updateRequest.affectedRows;
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

export async function DELETE(request) {
    try {
        const { requestId } = await request.json(); // Ensure that categoryId is extracted correctly from the request body
        const deleteUser = await query({
            query: "DELETE FROM request WHERE id = ?",
            values: [requestId],
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

export async function PUT(request) {
    try {
        const { requestId, req, description } = await request.json();
        const updateProducts = await query({
            query: "UPDATE request SET RecipeTypeName = ?, description = ? WHERE id = ?",
            values: [req, description, requestId],
        });
        const result = updateProducts.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            id: requestId,
            request: request,
            description: description,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: error
        }));
    }
}

