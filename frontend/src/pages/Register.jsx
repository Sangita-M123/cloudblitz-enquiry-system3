import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../config/api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!form.name || form.name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!form.password || form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/register`, form);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || err.response?.data?.errors?.[0]?.message || "Registration failed";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Register</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          minLength="2"
        />
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
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength="6"
        />
        <button 
          className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
