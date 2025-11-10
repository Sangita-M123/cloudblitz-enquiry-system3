import { useEffect, useState } from "react";
import axios from "axios";
//import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API_BASE_URL from "../config/api";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // const decoded = token ? jwtDecode(token) : null;
  // const userRole = decoded?.role;
 const { user } = useContext(AuthContext);
 const userRole = user?.role;

  const API_URL = `${API_BASE_URL}/admin`;

  //  Fetch all users (admin-only)
  const fetchUsers = async () => {
    if (userRole !== "admin") return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.users || []);
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
      alert("Failed to fetch users ❌");
    } finally {
      setLoading(false);
    }
  };

  //  Update user role
  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(
        `${API_URL}/users/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
      alert("Role updated ✅");
    } catch (err) {
      console.error("❌ Failed to update role:", err);
      alert("Failed to update role ❌");
    }
  };

  //  Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      alert("User deleted ✅");
    } catch (err) {
      console.error("❌ Failed to delete user:", err);
      alert("Failed to delete user ❌");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  //  Access restriction for non-admin users
  if (userRole !== "admin") {
    return (
      <div className="text-center mt-10 text-red-600">
        <h2 className="text-2xl font-bold mb-2">Access Denied 🚫</h2>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Admin Panel 🧑‍💼</h1>

      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">All Users</h2>

        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="border p-2">{u.name || "No Name"}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2 text-center">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="user">User</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
