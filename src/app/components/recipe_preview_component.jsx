"use client"

// components/VanillaCake.js
import React, { useState } from 'react';
import Recipe from '../components/recipe_image';

const VanillaCake = () => {
    const [people, setPeople] = useState(1);
    const [recipe, setRecipe] = useState([]);

    const calculateRecipe = () => {
        // Calculate new recipe based on the number of people
        // For demonstration, let's just multiply the ingredient quantities by the number of people
        const newRecipe = [
            { ingredient: "Flour", quantity: 2.00 * people },
            { ingredient: "Sugar", quantity: 2.00 * people },
            { ingredient: "Butter", quantity: 1.00 * people },
            { ingredient: "Eggs", quantity: 4.00 * people },
            { ingredient: "Vanilla Extract", quantity: 2.00 * people },
            { ingredient: "Baking Powder", quantity: 1.50 * people },
            { ingredient: "Milk", quantity: 1.00 * people }
        ];
        setRecipe(newRecipe);
    };

    const handleChange = (event) => {
        const newPeople = parseInt(event.target.value);
        setPeople(newPeople);
    };

    return (
        <div id="content" className="bg-gray-5 py-2 mt-40">
            <div className="container-custom">
                <section className="max-w-8xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* First column for title and image */}
                        <div className="flex flex-col">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl lg:text-2xl font-bold mb-4">Vanilla Cake</h2>
                            </div>
                            <div className="relative mb-8 w-full lg:w-3/4 lg:max-w-md ms-7">
                                <div className="">
<Recipe />                                 </div>
                            </div>
                        </div>
                        {/* Second column for ingredients */}
                        <div className="flex flex-col">
                            <div>
                                <h3 className="text-xl lg:text-2xl font-semibold mb-2">Ingredients For The Recipe of Vanilla Cake</h3>
                                <ul className="list-disc pl-4">
                                    <li>2.00 cups Flour</li>
                                    <li>2.00 cups Sugar</li>
                                    <li>1.00 cup Butter</li>
                                    <li>4.00 large Eggs</li>
                                    <li>2.00 tsp Vanilla Extract</li>
                                    <li>1.50 tsp Baking Powder</li>
                                    <li>1.00 cup Milk</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col ms-20">
                            <div>
                                <h6 className="text-xl lg:text-2xl font-semibold mb-2">Calculated Recipe for {people} people</h6>
                                <ul className="list-disc pl-4">
                                    {recipe.map((item, index) => (
                                        <li key={index}>{item.quantity.toFixed(2)} {item.ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col me-8">
                            <div className="mb-8">
                                <h6 className="text-3xl lg:text-2xl font-bold mb-4">Meal Plan</h6>
                                <p className="text-gray-600 font-semibold">Enter number of people (up to 8)</p>
                            </div>
                            <input type="number" id="people" min="1" max="8" value={people} onChange={handleChange} className="block mb-4 w-100 bg-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white" />
                            <button onClick={calculateRecipe} className="calculate-btn mb-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 hover:bg-blue-600 focus:outline-none">Calculate</button>
                            <div id="ingredient-list"></div>
                        </div>
                        {/* Fourth column for dynamically calculated recipe */}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default VanillaCake;
