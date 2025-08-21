import { Outlet, Link } from "react-router-dom";

function Profile() {
  return (
    <div>
        <h2>Profile Page</h2>
        <nav>
            <Link to="details">Details</Link>
            <Link to="settings">Settings</Link>
        </nav>
    </div>
  );
}
export default Profile;