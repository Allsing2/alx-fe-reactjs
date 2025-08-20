import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";
import mockRegisterApi from "./components/mockRegisterApi";



export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      {/* Tailwind CSS CDN for styling - necessary for the Tailwind classes to work */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts for Inter - for consistent typography */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* Apply Inter font */}
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>

      {/* Render both registration forms */}
      <MockRegisterApi />
      <RegistrationForm />
      <FormikForm />
    </div>
  );
}