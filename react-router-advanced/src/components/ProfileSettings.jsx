// src/pages/Profile.jsx
import { Outlet, Link } from "react-router-dom";

function Profile() {
  return (
    <div className="card">
      <h2>Profile Page</h2>
      <nav>
        <Link to="details">Details</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav>

      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
}

export default Profile;
