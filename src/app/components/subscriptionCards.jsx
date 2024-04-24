"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { useSearchParams } from 'next/navigation'; // Import useSearchParams from Next.js


const SubscriptionCard = ({ title, features, price }) => {
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const router = useRouter(); // Initialize useRouter from Next.js
  const params = useSearchParams(); // Get query parameters


  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // Convert price to integer
      const priceInt = parseInt(price.replace(/\D/g, ''), 10); // Remove non-numeric characters and parse as integer

      // Join features array with <br> tags
      const featuresText = features.join('<br>');

      const response = await fetch('http://localhost:3000/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, features: featuresText, price: priceInt }),
      });

      if (response.ok) {
        setLoading(false);
        setSubscribed(true);

        const newPath = `/pages/client/invoice`;
        router.push(newPath);

      } else {
        console.error('Subscription failed:', response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error subscribing:', error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-full w-4/5 items-center justify-center rounded-lg bg-red shadow-md">
      <div className="p-4">
        <h1 className="mb-2 text-xl font-semibold">{title}</h1>
        <p className="mb-4 mt-10 text-gray-600">{price}</p>
        <ul className="mb-4">
          {/* Display 10 features */}
          {features.slice(0, 10).map((feature, index) => (
            <li key={index} className="flex items-center mt-5 text-gray-600">
              <svg
                className="mr-1 h-4 w-4 fill-current text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 17a1 1 0 0 1-.707-1.707l6-6a1 1 0 1 1 1.414 1.414l-6 6A.999.999 0 0 1 9 17zm0-14a1 1 0 0 0-.707.293L3 9.586l1.707 1.707 4.586-4.586A1 1 0 0 0 9 3zm8.293 3.707l-10 10A1 1 0 0 1 6 16H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 .293-.707l10-10a1 1 0 1 1 1.414 1.414z" />
              </svg>
              <strong>{feature}</strong>
            </li>
          ))}
        </ul>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
          </div>
        ) : (
          <button
            onClick={handleSubscribe}
            className="rounded-md bg-blue-500 mt-10 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
          >
            Subscribe
          </button>
        )}
        {subscribed && (
          <div className="mt-4 text-green-600">
            Subscribed successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;
