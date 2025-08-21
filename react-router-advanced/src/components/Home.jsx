// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="card">
      <h1>Welcome</h1>
      <p>This is the landing page.</p>

      <nav>
        <ul>
          <li><Link to="/profile/details">Profile Details</Link></li>
          <li><Link to="/profile/settings">Profile Settings</Link></li>
          <li><Link to="/blog/1">Blog Post 1</Link></li>
        </ul>
      </nav>

      {isAuthenticated ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <button onClick={() => login()}>Login</button>
      )}
    </div>
  );
}

export default Home;