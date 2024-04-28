import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import IMG from "../acme-logo";
import { message } from "antd";

interface UrlParams {
  price?: string; // Define price as optional
}

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [kwachaPrice, setKwachaPrice] = useState<string>("0");
  const [usdPrice, setUsdPrice] = useState<number>(0);
  const [subject, setSubject] = useState("");
  const [msg, setMessage] = useState("");

  const [urlParams, setUrlParams] = useState<UrlParams | null>(null);

  useEffect(() => {
    const getUrlParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const params: UrlParams = {};
      for (const [key, value] of searchParams) {
        params[key] = value;
      }
      return params;
    };

    const params = getUrlParams();
    console.log("URL Parameters:", params);
    setUrlParams(params);

    if (params.price) {
      setKwachaPrice(params.price);
      const kwacha = parseFloat(params.price);
      const conversionRate = 1750;
      const usd = kwacha / conversionRate;
      const roundedUsd = Math.round(usd);
      setUsdPrice(roundedUsd);
    }
  }, []);

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const cardElement = elements?.getElement("card");
  const emailInput = document.querySelector('input[name="email"]'); // Get the email input

  if (!cardElement || !emailInput) {
    return;
  }

  try {
    setLoading(true);

    const email = (emailInput as HTMLInputElement).value; // Get the value of the email input

    if (!stripe || !cardElement) return null;
    const { data } = await axios.post("/api/create-payment-intent", {
      data: { amount: usdPrice },
    });
    const clientSecret = data;

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    console.log("Payment Intent:", paymentIntent);

    if (paymentIntent && Object.keys(paymentIntent).length !== 0) {
      const { amount, id } = paymentIntent;

      await axios.post("http://localhost:3000/api/payment", {
        paymentIntent: { amount, id },
      });

      message.success("Payment completed successfully!");

      sendEmail(email, amount, id); // Pass email to sendEmail function
    } else {
      throw new Error("Payment failed please try again later.");
    }
  } catch (error) {
    console.log(error);
    message.error(error.message || "Payment failed. Please try again later.");
  } finally {
    setLoading(false);
  }
};

 const sendEmail = async (email: string, amount: number, id: string) => {
   const response = await fetch("http://localhost:3000/api/sendEmail", {
     method: "POST",
     headers: {
       "content-type": "application/json",
     },
     body: JSON.stringify({
       email, // Include the email in the request body
       subject,
       msg,
       payment: { amount, id },
     }),
   });
   console.log(await response.json());
 };

  if (!urlParams) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={onSubmit} className="w-250">
      <div className="flex justify-center items-center h-md">
        <div className="bg-white shadow-md rounded-lg p-8 w-250">
          <div className="mb-6">
            <div className="mb-20">
              <IMG />
            </div>
            <h1 className="text-lg font-bold mb-4">ENTER YOUR EMAIL</h1>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              // Add any necessary state and event handling for email input
            />
            <h1 className="text-lg font-bold mb-4">ENTER YOUR CARD DETAILS</h1>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "15px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 mt-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : `Pay ${Math.round(
                  parseFloat(kwachaPrice)
                ).toLocaleString()} kwacha`}
          </button>
        </div>
      </div>
    </form>
  );
}
