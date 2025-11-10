import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">CloudBlitz</h1>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="hover:underline transition duration-150"
            >
              Dashboard
            </Link>
            <Link
              to="/enquiries"
              className="hover:underline transition duration-150"
            >
              Enquiries
            </Link>
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="hover:underline transition duration-150"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition duration-150"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:underline transition duration-150"
            >
              Login
            </Link>
            <Link
              to="/"
              className="hover:underline transition duration-150"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
