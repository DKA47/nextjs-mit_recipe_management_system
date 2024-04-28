"use client"

import React, { useState, useEffect } from 'react';
import Recipe from '../../../components/recipe_image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import Image from 'next/image';
import { Alert } from 'antd';

const Home = () => {
    const [people, setPeople] = useState(1);
    const [originalRecipe, setOriginalRecipe] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [recipeName, setRecipeName] = useState("");
    const [rating, setRating] = useState(); // State to hold recipe rating
    const [review, setReview] = useState(""); // State to hold recipe review
    const [successMessageVisible, setSuccessMessageVisible] = useState(false); // State to control success message visibility

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
            fetchRecipes(urlParams);
        }
    }, [urlParams]);

    const fetchRecipes = async (params) => {
        try {
            const response = await fetch('http://localhost:3000/api/recipe_preview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId: params.recipeId }),
            });
            if (response.ok) {
                const jsonData = await response.json();
                setOriginalRecipe(jsonData);
                setRecipe(jsonData);
                setRecipeName(jsonData[0].recipename);
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
            quantity: (parseFloat(item.quantity) * people).toFixed(2)
        }));
        setRecipe(newRecipe);
    };

    const handleChange = (event) => {
        const newPeople = parseInt(event.target.value);
        setPeople(newPeople);
    };

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const submitRatingReview = async () => {
        console.log('Submitting rating and review...');
        try {
            const response = await fetch('http://localhost:3000/api/recipe_rating_review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipeId: urlParams.recipeId,
                    rating: rating,
                    review: review
                }),
            });
            if (response.ok) {
                console.log('Review submitted successfully!');
                setSuccessMessageVisible(true); // Display success message
                setReview(''); // Clear the review state
            } else {
                console.error('Failed to submit rating and review:', response.status);
            }
        } catch (error) {
            console.error('Error submitting rating and review:', error);
        }
    };

    const StarIcon = ({ selected, onSelect }) => (
        <span
            className={`cursor-pointer ${selected ? 'text-yellow-400' : 'text-gray-400'}`}
            onClick={onSelect}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10 2.705l1.948 4.695a.5.5 0 0 0 .448.295h5.042l-3.87 3.356a.5.5 0 0 0-.157.51l1.16 5.68-4.818-2.674a.5.5 0 0 0-.47 0l-4.818 2.674 1.16-5.68a.5.5 0 0 0-.157-.51L1.604 7.695h5.042a.5.5 0 0 0 .448-.295L10 2.705z"
                    clipRule="evenodd"
                />
            </svg>
        </span>
    );

    return (
        <div id="content" className="bg-gray-5 py-2 mt-20">
            <div className="container-custom">
                <section className="max-w-8xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl lg:text-2xl font-bold mb-4">{recipeName}</h2>
                            </div>
                            <div className="relative mb-8 w-full lg:w-3/4 lg:max-w-md ms-7">
                                <div className="">
                                    <div className="text-white">
                                        <Image
                                            src="/download.jpg"
                                            alt={recipeName}
                                            width={1000}
                                            height={800}
                                            className="mr-4 rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <div className="flex flex-col me-8">
                            <div className="mb-8">
                                <h6 className="text-3xl lg:text-2xl font-bold mb-4">Meal Plan</h6>
                                <p className="text-gray-600 font-semibold">Enter number of people (up to 8)</p>
                            </div>
                            <input type="number" id="people" min="1" max="8" value={people} onChange={handleChange} className="block mb-4 w-100 bg-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white" />
                            <button onClick={calculateRecipe} className="calculate-btn mb-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 hover:bg-blue-600 focus:outline-none">Calculate</button>
                            <div id="ingredient-list"></div>
                            <label className="block mb-2 text-gray-600 font-semibold mt-20">Rating:</label>
                            <div className="mb-4 flex">
                                {[...Array(5)].map((_, index) => (
                                    <StarIcon
                                        key={index}
                                        selected={index < rating}
                                        onSelect={() => handleRatingClick(index + 1)}
                                    />
                                ))}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="review" className="block mb-2 text-gray-600 font-semibold">Review:</label>
                                <textarea id="review" value={review} onChange={handleReviewChange} className="block w-full bg-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white"></textarea>
                            </div>
                            <button onClick={submitRatingReview} className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 hover:bg-blue-600 focus:outline-none">Submit Rating & Review</button>
                            {successMessageVisible && (
                                <Alert
                                    message="Success"
                                    description="Review submitted successfully!"
                                    type="success"
                                    showIcon
                                    closable
                                    onClose={() => setSuccessMessageVisible(false)}
                                    className="mt-4"
                                />
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
