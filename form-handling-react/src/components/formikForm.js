// FormikRegistrationForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Formik components for simplified form handling
import * as Yup from 'yup'; // Yup for schema-based validation
// Assuming mockRegisterApi is imported from a utility file.
// The path has been adjusted to correctly import the mock API.
import mockRegisterApi from './mock-register-api-utility';

const FormikRegistrationForm = () => {
  // State for displaying messages to the user (e.g., success/error)
  const [message, setMessage] = useState('');
  // Local state to manage loading state specifically for this Formik form, complementing Formik's isSubmitting
  const [isSubmittingFormik, setIsSubmittingFormik] = useState(false);

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'), // Username is a required string
    email: Yup.string().email('Invalid email format').required('Email is required'), // Email must be valid format and required
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'), // Password must be at least 6 chars and required
  });

  // Handler for form submission. Formik automatically passes form values and helper functions.
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage(''); // Clear any previous messages
    setIsSubmittingFormik(true); // Activate local loading state

    try {
      // Call the mock API with the form values from Formik
      const response = await mockRegisterApi(values);
      setMessage(response.message); // Display the message from the API response
      if (response.success) {
        resetForm(); // Clear the form on successful registration
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.'); // Generic error message
    } finally {
      setSubmitting(false); // Tell Formik that submission is complete
      setIsSubmittingFormik(false); // Reset local loading state
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full my-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Formik Registration</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '' }} // Initial values for the form fields
        validationSchema={validationSchema} // Yup schema for validation
        onSubmit={handleSubmit} // Function to call on form submission
      >
        {/* Render props pattern: Formik provides form state and helpers to its children */}
        {({ isSubmitting }) => (
          <Form className="space-y-4"> {/* Formik's Form component automatically handles onSubmit */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="formikUsername">
                Username:
              </label>
              <Field // Formik's Field component automatically links to form state and handles onChange/value
                type="text"
                id="formikUsername"
                name="username" // The 'name' prop must match the key in initialValues and validationSchema
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                disabled={isSubmittingFormik} // Disable input while submitting
              />
              <ErrorMessage // Formik's ErrorMessage displays validation errors for a specific field
                name="username"
                component="div" // Render the error message inside a div
                className="text-red-600 text-sm mt-1"
              />
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
                disabled={isSubmittingFormik} // Disable input while submitting
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
                disabled={isSubmittingFormik} // Disable input while submitting
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out"
              disabled={isSubmittingFormik} // Disable button while submitting
            >
              {isSubmittingFormik ? 'Submitting...' : 'Register with Formik'}
            </button>
            {/* Display messages if present */}
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

export default FormikRegistrationForm;
