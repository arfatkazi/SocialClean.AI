import React, { useState } from "react";
import { Twitter, Facebook, Instagram, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Scan = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);

  const connectAccount = (platform) => {
    alert(`${platform} connected (mock).`);
  };

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setResults([]);

    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Mock results
          setResults([
            {
              id: 1,
              type: "Text",
              content: "This is dumb",
              category: "Offensive",
            },
            { id: 2, type: "Image", content: "party.jpg", category: "Safe" },
            {
              id: 3,
              type: "Text",
              content: "Call me at 9876543210",
              category: "Private Info",
            },
          ]);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

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

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center mt-30">
        Scan Your Accounts
      </h2>

      {/* Connect Accounts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.name}
              onClick={() => connectAccount(platform.name)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white transition ${platform.color} w-full`}
            >
              <Icon size={20} /> {platform.name}
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
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 transition-all duration-200 w-full sm:w-auto"
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
            transition={{ ease: "easeInOut", duration: 0.4 }}
            className="bg-indigo-600 h-4 rounded-full"
          />
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Scan Results</h3>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="w-full text-left border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 text-sm sm:text-base">
                      ID
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-sm sm:text-base">
                      Type
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-sm sm:text-base">
                      Content
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-sm sm:text-base">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.id * 0.2 }}
                      className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <td className="px-3 sm:px-4 py-2">{item.id}</td>
                      <td className="px-3 sm:px-4 py-2">{item.type}</td>
                      <td className="px-3 sm:px-4 py-2">{item.content}</td>
                      <td
                        className={`px-3 sm:px-4 py-2 font-medium ${
                          item.category === "Offensive"
                            ? "text-red-500"
                            : item.category === "Private Info"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {item.category}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scan;
