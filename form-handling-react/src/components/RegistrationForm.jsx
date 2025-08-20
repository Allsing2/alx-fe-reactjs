import React, { useState } from 'react';

// Main App component that renders the RegistrationForm
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <RegistrationForm />
    </div>
  );
}

// RegistrationForm component
function RegistrationForm() {
  // State variables for each input field
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State for error messages
  const [error, setError] = useState('');
  // State for success message
  const [success, setSuccess] = useState('');

  // Handle changes for the username input
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // Clear error/success messages on input change
    setError('');
    setSuccess('');
  };

  // Handle changes for the email input
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error/success messages on input change
    setError('');
    setSuccess('');
  };

  // Handle changes for the password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear error/success messages on input change
    setError('');
    setSuccess('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation: Check if any field is empty
    if (!username || !email || !password) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }

    // If all validations pass, log the form data and show success
    console.log('Registration Data:', { username, email, password });
    setSuccess('Registration successful!');
    setError('');

    // Optionally, clear the form fields after successful submission
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username} // Controlled input: value is tied to state
            onChange={handleUsernameChange} // Updates state on change
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your username"
            aria-required="true"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email} // Controlled input: value is tied to state
            onChange={handleEmailChange} // Updates state on change
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your email"
            aria-required="true"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password} // Controlled input: value is tied to state
            onChange={handlePasswordChange} // Updates state on change
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your password"
            aria-required="true"
          />
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Success Message Display */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
        >
          Register
        </button>
      </form>
    </div>
  );
}

