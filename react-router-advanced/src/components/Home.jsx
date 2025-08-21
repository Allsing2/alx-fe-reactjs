// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { fakeAuth } from "../auth";

function Home() {
        const login = () => fakeAuth.login(() => window.location.reload());
        const logout = () => fakeAuth.logout(() => window.location.reload());
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <p>This is the landing page of your React Router app.</p>
      <nav>
        <ul>
            <li><Link to="/about">Go to About</Link></li>
            <li><Link to="/profile/details">Profile Details</Link></li>
            <li><Link to="/profile/settings">Profile Settings</Link></li>
            <li><Link to="/blog/1">Blog Post 1</Link></li>
            <li><Link to="/blog/2">Blog Post 2</Link></li>
            <li><Link to="/blog/hello-world">Blog Post Hello World</Link></li>
        </ul>
      </nav>
        <div className="card">
            <h1>Welcome</h1>
            <p>This is the landing page.</p>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
         </div>
    </div>
  );
}

export default Home;
