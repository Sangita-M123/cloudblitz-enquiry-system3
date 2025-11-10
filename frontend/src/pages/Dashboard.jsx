

import { useEffect, useState } from "react";
import { useEnquiries } from "../context/EnquiryContext";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { enquiries, loading, fetchEnquiries } = useEnquiries();
  const [stats, setStats] = useState({ total: 0, new: 0, inProgress: 0, closed: 0 });

  useEffect(() => {
    if (enquiries.length === 0) {
      fetchEnquiries();
    }

    const computedStats = {
      total: enquiries.length,
      new: enquiries.filter((e) => e.status === "New").length,
      inProgress: enquiries.filter((e) => e.status === "In Progress").length,
      closed: enquiries.filter((e) => e.status === "Closed").length,
    };
    setStats(computedStats);
  }, [enquiries]);

  if (loading) return <Loader />;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        Dashboard 📊
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-white shadow-md p-6 rounded w-48 text-center border-t-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-700">Total</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded w-48 text-center border-t-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-700">New</h2>
          <p className="text-2xl font-bold text-green-600">{stats.new}</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded w-48 text-center border-t-4 border-yellow-500">
          <h2 className="text-lg font-semibold text-gray-700">In Progress</h2>
          <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded w-48 text-center border-t-4 border-red-500">
          <h2 className="text-lg font-semibold text-gray-700">Closed</h2>
          <p className="text-2xl font-bold text-red-600">{stats.closed}</p>
        </div>
      </div>

      {!loading && stats.total === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No enquiries yet. Create your first one to see stats here.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
