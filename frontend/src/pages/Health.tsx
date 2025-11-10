import { useEffect, useState } from "react";

export default function Health() {
  const [msg, setMsg] = useState("🔍 Checking API health...");

  useEffect(() => {
    const base = "http://localhost:5000";

    fetch(`${base}/api/health`)
      .then((res) => res.text())
      .then((text) => setMsg(`✅ ${text}`))
      .catch(() => setMsg("❌ API unreachable. Please check the server."));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-blue-600 mb-3">
          CloudBlitz Health Check
        </h1>
        <p className="text-gray-700">{msg}</p>
      </div>
    </div>
  );
}
