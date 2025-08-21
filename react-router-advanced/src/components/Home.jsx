import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="card">
      <h1>Welcome</h1>
      <nav>
        <Link to="/profile/details">Profile Details</Link> |{" "}
        <Link to="/profile/settings">Profile Settings</Link> |{" "}
        <Link to="/blog/1">Blog Post 1</Link>
      </nav>

      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}

export default Home;
