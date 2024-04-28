import { query } from "../../../lib/db";

export async function PUT(request) {
    try {
        const { requestId } = await request.json();
        const updateProducts = await query({
            query: "UPDATE request SET state = 'Approved' WHERE id = ?",
            values: [requestId],
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

