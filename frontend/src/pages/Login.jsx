import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../config/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!form.password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, form);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || "Login failed. Please check your credentials.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button 
          className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
