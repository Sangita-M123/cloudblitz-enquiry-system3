import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const API_URL = `${API_BASE_URL}/enquiries`;

  //  Fetch all enquiries (Admins & Staff see all; Users see their own)
  const fetchEnquiries = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error("❌ Error fetching enquiries:", err);
      setError("Failed to fetch enquiries");
    } finally {
      setLoading(false);
    }
  };

  //  Create a new enquiry
  const createEnquiry = async (newEnquiry) => {
    if (!token) return;
    try {
      await axios.post(API_URL, newEnquiry, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchEnquiries(); // refresh list
    } catch (err) {
      console.error("❌ Error creating enquiry:", err);
      setError("Failed to create enquiry");
    }
  };

  //  Update an existing enquiry
  const updateEnquiry = async (id, updates) => {
    if (!token) return;
    try {
      await axios.put(`${API_URL}/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchEnquiries();
    } catch (err) {
      console.error("❌ Error updating enquiry:", err);
      setError("Failed to update enquiry");
    }
  };

  //  Soft delete enquiry
  const deleteEnquiry = async (id) => {
    if (!token) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries(enquiries.filter((e) => e._id !== id));
    } catch (err) {
      console.error("❌ Error deleting enquiry:", err);
      setError("Failed to delete enquiry");
    }
  };

  //  Auto fetch on mount or when token changes
  useEffect(() => {
    fetchEnquiries();
  }, [token]);

  return (
    <EnquiryContext.Provider
      value={{
        enquiries,
        setEnquiries,
        fetchEnquiries,
        createEnquiry,
        updateEnquiry,
        deleteEnquiry,
        loading,
        error,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

//  Custom hook to access enquiry context easily
export const useEnquiries = () => useContext(EnquiryContext);
