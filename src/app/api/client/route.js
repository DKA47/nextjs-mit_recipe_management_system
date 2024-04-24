import { query } from "../../../lib/db";

// Backend - POST Function
// export async function POST(request) {
//     try {
//         const { email, password } = await request.json();

//         // Query the database to check if the user exists with the provided email and password
//         const user = await query({
//             query: "SELECT * FROM client WHERE email = ? AND password = ?",
//             values: [email, password],
//         });

//         let message = "";
//         let status = 200;

//         // If user exists, login is successful
//         if (user.length > 0) {
//             message = "success";
//         } else {
//             message = "error";
//             status = 401; // Unauthorized status code
//         }

//         return new Response(JSON.stringify({
//             message: message,
//             status: status,
//         }), {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//     } catch (error) {
//         return new Response(JSON.stringify({
//             status: 500,
//             error: error.message
//         }), {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//     }
// }

export async function POST(request) {
    try {
        const { first_name, last_name, email, postalCode, gender, city, password } = await request.json();
        const updateUsers = await query({
            query: "INSERT INTO client (first_name, last_name,email,gender,city,postalcode,password) VALUES (?, ?, ?,?,?,?,?)",
            values: [first_name,last_name,email,postalCode,gender,city,password],
        });
        const result = updateUsers.affectedRows;
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


// export async function PUT(request) {

//     try {
//         const { id, visitor_name } = await request.json();
//         const updateProducts = await query({
//             query: "UPDATE visitors SET visitor_name = ? WHERE id = ?",
//             values: [visitor_name, id],
//         });
//         const result = updateProducts.affectedRows;
//         let message = "";
//         if (result) {
//             message = "success";
//         } else {
//             message = "error";
//         }
//         const product = {
//             id: id,
//             visitor_name: visitor_name,
//         };
//         return new Response(JSON.stringify({
//             message: message,
//             status: 200,
//             product: product
//         }));
//     } catch (error) {
//         return new Response(JSON.stringify({
//             status: 500,
//             data: res
//         }));
//     }

// }


// export async function DELETE(request) {

//     try {
//         const { id } = await request.json();
//         const deleteUser = await query({
//             query: "DELETE FROM visitors WHERE id = ?",
//             values: [id],
//         });
//         const result = deleteUser.affectedRows;
//         let message = "";
//         if (result) {
//             message = "success";
//         } else {
//             message = "error";
//         }
//         const product = {
//             id: id,
//         };
//         return new Response(JSON.stringify({
//             message: message,
//             status: 200,
//             product: product
//         }));
//     } catch (error) {
//         return new Response(JSON.stringify({
//             status: 500,
//             data: res
//         }));
//     }

// }