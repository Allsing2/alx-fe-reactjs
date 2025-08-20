// RegistrationForm.js
import React, { useState } from 'react';
// Assuming mockRegisterApi is imported from a utility file.
// The path has been adjusted to correctly import the mock API.
import mockRegisterApi from './mock-register-api-utility';

const RegistrationForm = () => {
  // State variables for each input field
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State for displaying messages to the user (e.g., success/error)
  const [message, setMessage] = useState('');
  // State to manage the loading/submitting status of the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setMessage(''); // Clear any previous messages

    // Basic client-side validation: check if any field is empty
    if (!username || !email || !password) {
      setMessage('All fields are required!');
      return; // Stop the submission if validation fails
    }

    setIsSubmitting(true); // Set submitting state to true to disable the button and show loading text
    try {
      // Call the mock API with the form data
      const response = await mockRegisterApi({ username, email, password });
      setMessage(response.message); // Display the message from the API response
    } catch (error) {
      setMessage('Registration failed. Please try again.'); // Generic error message for API failures
    } finally {
      setIsSubmitting(false); // Reset submitting state regardless of success or failure
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full my-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Controlled Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username} // Controlled component: input value is tied to state
            onChange={(e) => setUsername(e.target.value)} // Update state on input change
            placeholder="Enter your username"
            disabled={isSubmitting} // Disable input while submitting
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email} // Controlled component
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
            placeholder="Enter your email"
            disabled={isSubmitting} // Disable input while submitting
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password} // Controlled component
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
            placeholder="Enter your password"
            disabled={isSubmitting} // Disable input while submitting
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Registering...' : 'Register'} {/* Change button text based on submitting state */}
        </button>
        {/* Display messages if present */}
        {message && (
          <p className={`text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'} mt-4`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
