import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      {/* The Link component navigates to the specified 'to' path without a full page reload */}
      <Link to="/" className="text-xl font-bold hover:text-gray-400 transition-colors">
        Recipe App
      </Link>
    </nav>
  );
}

export default Navbar;