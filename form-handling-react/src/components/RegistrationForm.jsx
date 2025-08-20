import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Mock API function to simulate registration
const mockRegisterApi = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Registering user:', userData);
      // Simulate success or failure
      if (userData.username === 'testuser' && userData.password === 'password123') {
        resolve({ success: false, message: 'User already exists!' });
      } else {
        resolve({ success: true, message: 'Registration successful!' });
      }
    }, 1000); // Simulate network delay
  });
};

// --- Controlled Component Form ---
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
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            disabled={isSubmitting}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isSubmitting}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
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

// --- Formik Form ---
const FormikRegistrationForm = () => {
  const [message, setMessage] = useState('');
  const [isSubmittingFormik, setIsSubmittingFormik] = useState(false);

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage('');
    setIsSubmittingFormik(true); // Control local loading state

    try {
      const response = await mockRegisterApi(values);
      setMessage(response.message);
      if (response.success) {
        resetForm(); // Clear the form on successful registration
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    } finally {
      setSubmitting(false); // Formik's submitting state
      setIsSubmittingFormik(false); // Reset local loading state
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full my-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Formik Registration</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="formikUsername">
                Username:
              </label>
              <Field
                type="text"
                id="formikUsername"
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                disabled={isSubmittingFormik}
              />
              <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="formikEmail">
                Email:
              </label>
              <Field
                type="email"
                id="formikEmail"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                disabled={isSubmittingFormik}
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="formikPassword">
                Password:
              </label>
              <Field
                type="password"
                id="formikPassword"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                disabled={isSubmittingFormik}
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out"
              disabled={isSubmittingFormik}
            >
              {isSubmittingFormik ? 'Submitting...' : 'Register with Formik'}
            </button>
            {message && (
              <p className={`text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'} mt-4`}>
                {message}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Main App component to render both forms
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Apply Inter font to body or a wrapper div */}
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>

      <RegistrationForm />
      <div className="my-8 text-gray-600 text-lg font-medium">--- OR ---</div>
      <FormikRegistrationForm />
    </div>
  );
}

