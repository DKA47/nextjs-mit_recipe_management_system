import { query } from "../../../lib/db";

// export async function POST(request) {
//     try {
//         // Parse the JSON data from the request body
//         const requestData = await request.json();

//         // Extract the CategoryId from the request data
//         const categoryId = requestData.CategoryId;

//         // Query the database using the extracted categoryId
//         const users = await query({
//             query: "SELECT * FROM recipe WHERE catid = ?",
//             values: [categoryId],
//         });

//         // Stringify the query result
//         const data = JSON.stringify(users);

//         // Return the response with the data and 200 status
//         return new Response(data, {
//             status: 200,
//         });
//     } catch (error) {
//         // Return an error response if something goes wrong
//         return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//             status: 500,
//         });
//     }
// }

export async function POST(request) {
    try {
        const { name, uom, quantity, recipe_id } = await request.json();
        // Adjust the query to insert the categoryId into the recipe table
        const insertRecipe = await query({
            query: "INSERT INTO recipe_ingredients (name, uom, quantity, recipe_id) VALUES (?, ?, ?, ?)",
            values: [name, uom, quantity, recipe_id ],
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



export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM recipe_ingredients",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}


export async function DELETE(request) {
    try {
        const { ingredient_id } = await request.json(); // Ensure that categoryId is extracted correctly from the request body
        const deleteUser = await query({
            query: "DELETE FROM  recipe_ingredients WHERE ingredient_id = ?",
            values: [ingredient_id],
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

// body: JSON.stringify({
//     recipeId: values.recipeId,
//     recipeName: values.recipeName,
//     Ingredients: values.Ingredients,
//     categoryId: values.categoryId
// }),


export async function PUT(request) {
    try {
        const { name,recipe_id, uom, ingredient_id, quantity } = await request.json();
        const updateProducts = await query({
            query: "UPDATE recipe_ingredients SET name = ?, recipe_id = ?, uom = ?, quantity = ? WHERE ingredient_id = ?",
            values: [name, recipe_id, uom, quantity, ingredient_id],
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

