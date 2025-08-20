import React from 'react';
import { useFormik } from 'formik'; // Import useFormik hook
import * as Yup from 'yup'; // Import Yup for schema validation

// Main App component that renders the FormikForm
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <FormikForm />
    </div>
  );
}

// FormikForm component
function FormikForm() {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: { // Initial values for form fields
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema, // Link validation schema
    onSubmit: (values, { setSubmitting, resetForm }) => { // Handle form submission
      // Simulate API call
      setTimeout(() => {
        console.log('Formik Registration Data:', values);
        alert(JSON.stringify(values, null, 2)); // Use alert for demonstration
        resetForm(); // Clear the form after submission
        setSubmitting(false); // Set submitting to false
      }, 400);
    },
  });

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Register with Formik</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            // Formik handles value, onChange, and onBlur
            {...formik.getFieldProps('username')}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your username"
            aria-required="true"
          />
          {/* Display validation error for username */}
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
          ) : null}
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
            // Formik handles value, onChange, and onBlur
            {...formik.getFieldProps('email')}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your email"
            aria-required="true"
          />
          {/* Display validation error for email */}
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          ) : null}
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
            // Formik handles value, onChange, and onBlur
            {...formik.getFieldProps('password')}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your password"
            aria-required="true"
          />
          {/* Display validation error for password */}
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          // Disable button while submitting
          disabled={formik.isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}