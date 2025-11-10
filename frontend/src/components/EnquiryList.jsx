import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000/api";

const EnquiryList = ({ userRole }) => {
  const [enquiries, setEnquiries] = useState([]);

  // Fetch enquiries from backend
  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/enquiry`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEnquiries(res.data.enquiries);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Update enquiry
  const handleChange = async (id, field, value) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/enquiry/${id}`,
        { [field]: value },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setEnquiries(prev =>
        prev.map(e => (e._id === id ? res.data.enquiry : e))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {enquiries.map(enquiry => (
        <div key={enquiry._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
          <p><b>User:</b> {userRole === "staff" ? enquiry.user?.name : "You"}</p>

          <textarea
            value={enquiry.text}
            onChange={e => handleChange(enquiry._id, "text", e.target.value)}
            disabled={false}
          />

          {userRole === "staff" && (
            <select
              value={enquiry.status}
              onChange={e => handleChange(enquiry._id, "status", e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default EnquiryList;

