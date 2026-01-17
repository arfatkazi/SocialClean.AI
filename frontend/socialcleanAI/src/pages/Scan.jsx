// frontend/src/pages/Scan.jsx
import React, { useState } from "react";
import { Twitter, Facebook, Instagram, Image } from "lucide-react";
import { motion } from "framer-motion";
import AIAnalysisModal from "../components/AIAnalysisModal";
import { API_URL } from "../config/api";
export default function Scan() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanData, setScanData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const platforms = [
    { name: "Twitter", color: "bg-blue-500 hover:bg-blue-600", icon: Twitter },
    {
      name: "Facebook",
      color: "bg-blue-700 hover:bg-blue-800",
      icon: Facebook,
    },
    {
      name: "Instagram",
      color: "bg-pink-500 hover:bg-pink-600",
      icon: Instagram,
    },
    {
      name: "Google Photos",
      color: "bg-red-500 hover:bg-red-600",
      icon: Image,
    },
  ];

  // Mock connection (later replace with OAuth)
  const connectAccount = (platform) => {
    alert(`${platform} connected (mock).`);
  };

  // Start scan logic
  const startScan = async () => {
    const posts = [
      {
        platform: "Twitter",
        postId: "t1",
        type: "Text",
        content: "This is dumb",
      },
      {
        platform: "Google Photos",
        postId: "g1",
        type: "Image",
        content: "passport.jpg",
      },
      {
        platform: "Twitter",
        postId: "t2",
        type: "Text",
        content: "Call me at 9876543210",
      },
    ];

    setIsScanning(true);
    setProgress(10);
    setScanData(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        setIsScanning(false);
        return;
      }

      const res = await fetch(`${API_URL}/api/scan/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ posts }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to start scan");
        setIsScanning(false);
        return;
      }

      setProgress(25);

      // Polling for scan completion
      const poll = setInterval(async () => {
        const freshToken = localStorage.getItem("token");
        if (!freshToken) {
          clearInterval(poll);
          setIsScanning(false);
          alert("Session expired, please log in again.");
          return;
        }

        try {
          const r = await fetch(`${API_URL}/api/scan/${data.scanId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${freshToken}`,
            },
          });

          if (!r.ok) return;
          const sd = await r.json();

          if (sd.status === "processing") {
            setProgress((p) => Math.min(90, p + 10));
          }

          if (sd.status === "done" || sd.status === "failed") {
            clearInterval(poll);
            setIsScanning(false);
            setProgress(100);
            setScanData(sd);
            setOpenModal(true);
          }
        } catch (err) {
          console.error("Polling error:", err);
          clearInterval(poll);
          setIsScanning(false);
        }
      }, 1500);
    } catch (err) {
      console.error("Scan start error:", err);
      alert("Server error while starting scan");
      setIsScanning(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto mt-50">
      {/* Page Heading */}
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Scan Your Accounts
      </h2>

      {/* Account Connection Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {platforms.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.name}
              onClick={() => connectAccount(p.name)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium ${p.color}`}
            >
              <Icon size={20} /> {p.name}
            </button>
          );
        })}
      </div>

      {/* Scan Button */}
      <div className="text-center mb-8">
        <motion.button
          onClick={startScan}
          disabled={isScanning}
          whileHover={{ scale: !isScanning ? 1.05 : 1 }}
          whileTap={{ scale: !isScanning ? 0.95 : 1 }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 transition-all duration-200"
        >
          {isScanning ? "Scanning..." : "Scan Now"}
        </motion.button>
      </div>

      {/* Progress Bar */}
      {isScanning && (
        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="bg-indigo-600 h-4 rounded-full"
          />
        </div>
      )}

      {/* Latest Scan Summary */}
      {scanData && (
        <div className="mt-6 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Latest Scan
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reputation:{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {scanData.summary?.reputationScore ?? "N/A"}
                </span>
              </p>
            </div>
            <button
              onClick={() => setOpenModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Modal for Detailed Results */}
      <AIAnalysisModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        scan={scanData}
      />
    </div>
  );
}
