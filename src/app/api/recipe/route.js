import { query } from "../../../lib/db";

export async function POST(request) {
    try {
        // Parse the JSON data from the request body
        const requestData = await request.json();

        // Extract the CategoryId from the request data
        const categoryId = requestData.CategoryId;

        // Query the database using the extracted categoryId
        const users = await query({
            query: "SELECT * FROM recipe JOIN diet_restrictions ON recipe.restriction_id =  diet_restrictions.restriction_id WHERE catid = ?",
            values: [categoryId],
        });

        // Stringify the query result
        const data = JSON.stringify(users);

        // Return the response with the data and 200 status
        return new Response(data, {
            status: 200,
        });
    } catch (error) {
        // Return an error response if something goes wrong
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}


export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM recipe",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}


export async function DELETE(request) {
    try {
        const { recipeId } = await request.json(); // Ensure that categoryId is extracted correctly from the request body
        const deleteUser = await query({
            query: "DELETE FROM recipe WHERE id = ?",
            values: [recipeId],
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
        const { restrictionId, recipeId, categoryId, recipeName} = await request.json();
        const updateProducts = await query({
            query: "UPDATE recipe SET restriction_id = ?, recipename = ?, catid = ? WHERE id = ?",
            values: [restrictionId, recipeName, categoryId, recipeId],
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

