import { query } from "../../../lib/db";

export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM my_subs",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {
    try {
        const { title, features, price } = await request.json();
        const updateSubscription = await query({
            query: "INSERT INTO my_subs (subname,description,price) VALUES (?,?,?)",
            values: [title, features, price],
        });
        const result = updateSubscription.affectedRows;
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


export async function PUT(request) {
    try {
        const { PaymentStatus, InvoiceId } = await request.json();
        const updateProducts = await query({
            query: "UPDATE my_subs SET PayStatus = ? WHERE id = ?",
            values: [PaymentStatus, InvoiceId],
        });
        const result = updateProducts.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            id: categoryId,
            categoryName: categoryName,
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


// export async function DELETE(request) {
//     try {
//         const { categoryId } = await request.json(); // Ensure that categoryId is extracted correctly from the request body
//         const deleteUser = await query({
//             query: "DELETE FROM categories WHERE id = ?",
//             values: [categoryId],
//         });
//         const result = deleteUser.affectedRows;
//         let message = "";
//         if (result) {
//             message = "success";
//         } else {
//             message = "error";
//         }
//         const product = {
//             id: categoryId, // Ensure that you use categoryId here instead of undefined 'id'
//         };
//         return new Response(JSON.stringify({
//             message: message,
//             status: 200,
//             product: product
//         }));
//     } catch (error) {
//         return new Response(JSON.stringify({
//             status: 500,
//             error: error.message // Include the error message for debugging purposes
//         }));
//     }
// }

// export async function PUT(request) {
//     try {
//         const { categoryId, categoryName, description } = await request.json();
//         const updateProducts = await query({
//             query: "UPDATE categories SET catname = ?, catdesc = ? WHERE id = ?",
//             values: [categoryName, description, categoryId],
//         });
//         const result = updateProducts.affectedRows;
//         let message = "";
//         if (result) {
//             message = "success";
//         } else {
//             message = "error";
//         }
//         const product = {
//             id: categoryId,
//             categoryName: categoryName,
//             description: description,
//         };
//         return new Response(JSON.stringify({
//             message: message,
//             status: 200,
//             product: product
//         }));
//     } catch (error) {
//         return new Response(JSON.stringify({
//             status: 500,
//             data: error
//         }));
//     }
// }

