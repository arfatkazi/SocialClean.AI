import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  BarChart,
  Settings,
  LogOut,
  Trash2,
  Check,
} from "lucide-react";
import DashboardCharts from "../components/DashboardCharts";
import { API_URL } from "../config/api";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("home");
  const [latestScan, setLatestScan] = useState(null);
  const navigate = useNavigate();

  const scanResults = latestScan?.items || [];

  // ✅ Fetch latest scan data
  const fetchLatestScan = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API_URL}/api/scan/latest/now`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setLatestScan(data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchLatestScan();

    // Optional: refresh dashboard every 60s
    const interval = setInterval(fetchLatestScan, 60000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md border-r border-gray-300 dark:border-gray-700 p-5 hidden md:flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-indigo-600 dark:text-indigo-400">
          Dashboard
        </h1>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setActivePage("home")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activePage === "home"
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Home size={20} /> Home
          </button>

          <button
            onClick={() => setActivePage("scan")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activePage === "scan"
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Search size={20} /> Scan
          </button>

          <button
            onClick={() => setActivePage("reports")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activePage === "reports"
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <BarChart size={20} /> Reports
          </button>

          <button
            onClick={() => setActivePage("settings")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activePage === "settings"
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Settings size={20} /> Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-700 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-30">
        {/* ================= HOME ================= */}
        {activePage === "home" && (
          <>
            <h2 className="text-5xl font-bold mb-25 ml-10">Recent Scans</h2>

            {latestScan ? (
              <>
                <DashboardCharts summary={latestScan.summary} />

                <div className="overflow-x-auto mt-25">
                  <table className="w-full text-left border border-gray-300 dark:border-gray-700 rounded-lg">
                    <thead className="bg-gray-200 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Content</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scanResults.map((item, index) => (
                        <tr
                          key={item._id || index}
                          className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{item.type}</td>
                          <td className="px-4 py-2 truncate max-w-xs">
                            {item.content}
                          </td>
                          <td
                            className={`px-4 py-2 font-medium ${
                              item.category === "Offensive"
                                ? "text-red-500"
                                : item.category === "Private Info"
                                  ? "text-yellow-500"
                                  : "text-green-500"
                            }`}
                          >
                            {item.category}
                          </td>
                          <td className="px-4 py-2 flex gap-2">
                            <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600">
                              <Trash2 size={16} /> Delete
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600">
                              <Check size={16} /> Skip
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="text-gray-400 mt-6 ml-25 text-2xl">
                No scans found yet. Click <strong>Scan</strong> to start your
                first analysis.
              </p>
            )}
          </>
        )}

        {/* ================= SCAN ================= */}
        {activePage === "scan" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Scan Accounts</h2>
            <p className="mb-6">Connect your accounts and scan posts.</p>
            <button
              onClick={() => navigate("/scan")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all duration-200"
            >
              Start Scan
            </button>
          </div>
        )}

        {/* ================= REPORTS ================= */}
        {activePage === "reports" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <p>Charts and analytics will appear here.</p>
          </div>
        )}

        {/* ================= SETTINGS ================= */}
        {activePage === "settings" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>User preferences and account settings will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
