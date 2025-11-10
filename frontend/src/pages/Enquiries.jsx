import { useState, useContext } from "react";
import { useEnquiries } from "../context/EnquiryContext";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Enquiries = () => {
  const { enquiries, fetchEnquiries, loading } = useEnquiries();
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    customerName: "",
    message: "",
  });

  const token = localStorage.getItem("token");
  const isAdminOrStaff = user?.role === "admin" || user?.role === "staff";

  const validateEmail = (email) => {
    if (!email) return true; // optional
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.customerName || form.customerName.length < 2) {
      alert("Customer name must be at least 2 characters");
      return;
    }
    
    if (!form.message || form.message.length < 10) {
      alert("Message must be at least 10 characters");
      return;
    }
    
    if (form.email && !validateEmail(form.email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    if (form.phone && !/^[0-9+\-\s()]*$/.test(form.phone)) {
      alert("Please enter a valid phone number");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/enquiries`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Enquiry created successfully!");
      setForm({ customerName: "", email: "", phone: "", message: "" });
      fetchEnquiries();
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || err.response?.data?.errors?.[0]?.message || "Failed to create enquiry";
      alert(`❌ ${errorMsg}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/enquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑 Enquiry deleted successfully");
      fetchEnquiries();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete enquiry");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `${API_BASE_URL}/enquiries/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchEnquiries();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update status");
    }
  };

  const handleEdit = (enquiry) => {
    setEditingId(enquiry._id);
    setEditForm({
      customerName: enquiry.customerName,
      message: enquiry.message || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      customerName: "",
      message: "",
    });
  };

  const handleUpdateEnquiry = async (id) => {
    if (!editForm.customerName || !editForm.message) {
      alert("Please fill all required fields");
      return;
    }
    
    if (editForm.message.length < 10) {
      alert("Message must be at least 10 characters");
      return;
    }

    try {
      // Normal users can only update customerName and message
      const updateData = {
        customerName: editForm.customerName,
        message: editForm.message,
      };

      await axios.put(
        `${API_BASE_URL}/enquiries/${id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Enquiry updated successfully!");
      setEditingId(null);
      fetchEnquiries();
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || "Failed to update enquiry";
      alert(`❌ ${errorMsg}`);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        Enquiries 📬
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 mb-8 w-full max-w-md mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Enquiry</h2>

        <input
          type="text"
          placeholder="Customer Name"
          className="border p-2 w-full mb-3 rounded"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full mb-3 rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <textarea
          placeholder="Message (minimum 10 characters)"
          className="border p-2 w-full mb-3 rounded"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows="4"
          minLength="10"
          required
        ></textarea>

        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Add Enquiry
        </button>
      </form>

      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          {isAdminOrStaff ? "All Enquiries" : "Your Enquiries"}
        </h2>

        {enquiries.length === 0 ? (
          <p className="text-gray-500 text-center">No enquiries yet. Add one above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Customer</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Message</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e._id}>
                    {editingId === e._id ? (
                      // Edit mode - Normal users can only edit name and message
                      <>
                        <td className="border p-2">
                          <input
                            type="text"
                            value={editForm.customerName}
                            onChange={(ev) => setEditForm({ ...editForm, customerName: ev.target.value })}
                            className="border p-1 w-full rounded"
                            required
                          />
                        </td>
                        <td className="border p-2 text-gray-500">{e.email || "-"}</td>
                        <td className="border p-2 text-gray-500">{e.phone || "-"}</td>
                        <td className="border p-2">
                          <textarea
                            value={editForm.message}
                            onChange={(ev) => setEditForm({ ...editForm, message: ev.target.value })}
                            className="border p-1 w-full rounded"
                            rows="2"
                            required
                          />
                        </td>
                        <td className="border p-2 text-center">
                          <span className={`px-2 py-1 rounded ${
                            e.status === "New" ? "bg-blue-100 text-blue-600" :
                            e.status === "In Progress" ? "bg-yellow-100 text-yellow-600" :
                            "bg-green-100 text-green-600"
                          }`}>
                            {e.status}
                          </span>
                        </td>
                        <td className="border p-2 text-center">
                          <button
                            onClick={() => handleUpdateEnquiry(e._id)}
                            className="text-green-600 hover:underline mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:underline"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      // View mode
                      <>
                        <td className="border p-2">{e.customerName}</td>
                        <td className="border p-2">{e.email || "-"}</td>
                        <td className="border p-2">{e.phone || "-"}</td>
                        <td className="border p-2">{e.message}</td>
                        <td className="border p-2 text-center">
                          {isAdminOrStaff ? (
                            <select
                              value={e.status}
                              onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                              className="border p-1 rounded"
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Closed">Closed</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded ${
                              e.status === "New" ? "bg-blue-100 text-blue-600" :
                              e.status === "In Progress" ? "bg-yellow-100 text-yellow-600" :
                              "bg-green-100 text-green-600"
                            }`}>
                              {e.status}
                            </span>
                          )}
                        </td>
                        <td className="border p-2 text-center">
                          {!isAdminOrStaff && (
                            <button
                              onClick={() => handleEdit(e)}
                              className="text-blue-600 hover:underline mr-2"
                            >
                              Edit
                            </button>
                          )}
                          {isAdminOrStaff && (
                            <button
                              onClick={() => handleDelete(e._id)}
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiries;

