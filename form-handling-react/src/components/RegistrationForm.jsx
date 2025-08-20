import React, { useState } from 'react';
import mockRegisterApi from '../api/mockRegisterApi';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!username || !email || !password) {
      setMessage('All fields are required!');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await mockRegisterApi({ username, email, password });
      setMessage(response.message);
    } catch {
      setMessage('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full my-4 border border-blue-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Controlled Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="controlledUsername">
            Username:
          </label>
          <input
            type="text"
            id="controlledUsername"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="controlledEmail">
            Email:
          </label>
          <input
            type="email"
            id="controlledEmail"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="controlledPassword">
            Password:
          </label>
          <input
            type="password"
            id="controlledPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none 
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
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
