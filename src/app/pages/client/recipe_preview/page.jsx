"use client"

import React, { useState, useEffect } from 'react';
import Recipe from '../../../components/recipe_image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

const Home = () => {
    const [people, setPeople] = useState(1);
    const [originalRecipe, setOriginalRecipe] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [recipeName, setRecipeName] = useState(""); // State to hold recipe name

    const router = useRouter();
    const params = useSearchParams();

    const [urlParams, setUrlParams] = useState(null);

    useEffect(() => {
        const getUrlParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const params = {};
            for (const [key, value] of searchParams) {
                params[key] = value;
            }
            return params;
        };

        const params = getUrlParams();
        console.log("URL Parameters:", params);
        setUrlParams(params);
    }, []);

    useEffect(() => {
        if (urlParams) {
            fetchRecipes(urlParams); // Pass urlParams to fetchRecipes
        }
    }, [urlParams]); // Make urlParams a dependency

    const fetchRecipes = async (params) => {
        try {
            const response = await fetch('http://localhost:3000/api/recipe_preview', {
                method: 'POST', // Change method to POST
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId: params.recipeId }), // Send CategoryId as JSON
            });
            if (response.ok) {
                const jsonData = await response.json();
                setOriginalRecipe(jsonData);
                setRecipe(jsonData);
                setRecipeName(jsonData[0].recipename); // Set recipe name
                console.log(jsonData);
            } else {
                console.error('Failed to fetch data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateRecipe = () => {
        const newRecipe = originalRecipe.map(item => ({
            ...item,
            quantity: (parseFloat(item.quantity) * people).toFixed(2) // Calculate new quantity based on the number of people
        }));
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
                                <h2 className="text-3xl lg:text-2xl font-bold mb-4">{recipeName}</h2> {/* Display dynamic recipe name */}
                            </div>
                            <div className="relative mb-8 w-full lg:w-3/4 lg:max-w-md ms-7">
                                <div className="">
                                    <div className="text-white">
                                        <Image
                                            src="/download.jpg"
                                            alt={recipeName}
                                            width={1000} // Adjust the width to make the image bigger
                                            height={800} // Adjust the height to maintain aspect ratio
                                            className="mr-4 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Second column for ingredients */}
                        <div className="flex flex-col">
                            <div>
                                <h3 className="text-xl lg:text-2xl font-semibold mb-2">Ingredients For The Recipe of {recipeName}</h3>
                                <ul className="list-disc pl-4">
                                    {originalRecipe.map((item, index) => (
                                        <li key={index}>{item.quantity} {item.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* Third column for dynamically calculated recipe */}
                        <div className="flex flex-col ms-20">
                            <div>
                                <h6 className="text-xl lg:text-2xl font-semibold mb-2">Calculated Recipe for {recipeName} for {people} people</h6>
                                <ul className="list-disc pl-4">
                                    {recipe.map((item, index) => (
                                        <li key={index}>{item.quantity} {item.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* Fourth column for user input and actions */}
                        <div className="flex flex-col me-8">
                            <div className="mb-8">
                                <h6 className="text-3xl lg:text-2xl font-bold mb-4">Meal Plan</h6>
                                <p className="text-gray-600 font-semibold">Enter number of people (up to 8)</p>
                            </div>
                            <input type="number" id="people" min="1" max="8" value={people} onChange={handleChange} className="block mb-4 w-100 bg-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white" />
                            <button onClick={calculateRecipe} className="calculate-btn mb-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 hover:bg-blue-600 focus:outline-none">Calculate</button>
                            <div id="ingredient-list"></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
