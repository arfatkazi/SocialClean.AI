import React, { useState } from "react";
import {
  Home,
  Search,
  BarChart,
  Settings,
  LogOut,
  Trash2,
  Check,
} from "lucide-react";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("home");

  // Example mock scan results
  const scanResults = [
    { id: 1, type: "Text", content: "This sucks", category: "Offensive" },
    { id: 2, type: "Image", content: "photo1.jpg", category: "Safe" },
    {
      id: 3,
      type: "Text",
      content: "Call me at 999-888-7777",
      category: "Private Info",
    },
  ];

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
            onClick={() => alert("Logging out...")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-700 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activePage === "home" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Recent Scans</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-300 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Content</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scanResults.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.type}</td>
                      <td className="px-4 py-2">{item.content}</td>
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
        )}

        {activePage === "scan" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Scan Accounts</h2>
            <p className="mb-6">Connect your accounts and scan posts.</p>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
              Start Scan
            </button>
          </div>
        )}

        {activePage === "reports" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <p>Charts and analytics will appear here.</p>
          </div>
        )}

        {activePage === "settings" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>User preferences and account settings.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
