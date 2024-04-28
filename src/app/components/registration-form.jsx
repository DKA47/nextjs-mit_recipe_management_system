"use client"; // This is a client component

import { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { message, Spin } from 'antd'; // Import message component from Ant Design
import Link from 'next/link';
import IMG from './acme-logo';
import { useRouter } from 'next/navigation';


export default function RegistrationForm() {
  const router = useRouter();
  // Define state variables to hold form input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to track registration process

  // Define the registerUser function that makes an HTTP POST request to the backend API
  const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json();
        return responseData; // Return the response data if registration is successful
      } else {
        throw new Error('Registration failed: ' + response.statusText);
      }
    } catch (error) {
      throw new Error('Error during registration: ' + error.message);
    }
  };

  // Define your handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true); // Set loading state to true when registration starts

      // Call the registerUser function with user data
      const responseData = await registerUser({
        first_name: firstName,
        last_name: lastName,
        email: email,
        postalCode: postalCode,
        gender: gender,
        city: city,
        password: password,
      });

      console.log('Registration successful:', responseData);
      message.success('Registration successful'); // Display success message using Ant Design message component
      router.push('../pages/login');
      // Optionally, you can redirect the user to a success page or perform other actions
    } catch (error) {
      console.error('Error during registration:', error);
      message.error(error.message); // Display error message using Ant Design message component
      // Handle the error appropriately
    } finally {
      setLoading(false); // Reset loading state after registration process completes
    }
  };
  return (
    <main className="container mx-auto max-w-3xl"> {/* Adjust the width of the container */}
      <div className="mx-auto w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md xl:max-w-2xl">
        <div className="px-6 py-8">
          <div className="text-center">
            <IMG />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                <Spin />
              </div>
            )}
          </div>
          <form className="mt-8 space-y-6 sm:flex sm:flex-wrap relative" onSubmit={handleSubmit}>
            <div className="sm:w-1/2 pr-4"> {/* Set width for the first column and add right padding */}
              <div className="mt-6"> {/* Add margin to separate input fields */}
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  autoComplete="first_name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-5"> {/* Add margin to separate input fields */}
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="last_name"
                  type="text"
                  autoComplete="last_name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-5"> {/* Add margin to separate input fields */}
                <label
                  htmlFor="email"
                  className=" mt-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" block w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:w-1/2 pl-4"> {/* Set width for the second column and add left padding */}
              <div className=""> {/* Add margin to separate input fields */}
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  autoComplete="gender"
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mt-5"> {/* Add margin to separate input fields */}
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <select
                  id="city"
                  type="text"
                  autoComplete="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select City</option>
                  <option value="Blantyre">Blantyre</option>
                  <option value="Lilongwe">Lilongwe</option>
                  <option value="Mzuzu">Mzuzu</option>
                  <option value="Zomba">Zomba</option>
                </select>

              </div>
              <div className="mt-5"> {/* Add margin to separate input fields */}
                <label
                  htmlFor="postalcode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  id="postalcode"
                  type="text"
                  autoComplete="postalcode"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-full mt-4"> {/* Full width for password and confirm password fields */}
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-full mt-4"> {/* Full width for password and confirm password fields */}
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-full mt-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative"
                disabled={loading} // Disable button while loading
                style={{ width: '100%' }} // Set fixed width for the button
              >
                {loading ? 'Registering...' : 'Register'}
                <ArrowRightIcon className={`ml-1 h-5 w-5 ${loading ? 'hidden' : ''}`} /> {/* Hide arrow icon when loading */}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or register with
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="../pages/login"
              className="block text-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
