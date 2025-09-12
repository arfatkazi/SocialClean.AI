import React, { useState } from "react";
import { Twitter, Facebook, Instagram, Image, Loader } from "lucide-react";

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

    // Fake scanning progress
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
        return prev + 20;
      });
    }, 500);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Scan Your Accounts</h2>

      {/* Connect Accounts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => connectAccount("Twitter")}
          className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          <Twitter size={20} /> Twitter
        </button>
        <button
          onClick={() => connectAccount("Facebook")}
          className="flex items-center justify-center gap-2 bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition"
        >
          <Facebook size={20} /> Facebook
        </button>
        <button
          onClick={() => connectAccount("Instagram")}
          className="flex items-center justify-center gap-2 bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition"
        >
          <Instagram size={20} /> Instagram
        </button>
        <button
          onClick={() => connectAccount("Google Photos")}
          className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition"
        >
          <Image size={20} /> Google Photos
        </button>
      </div>

      {/* Scan Button */}
      <div className="text-center mb-8">
        <button
          onClick={startScan}
          disabled={isScanning}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50"
        >
          {isScanning ? "Scanning..." : "Scan Now"}
        </button>
      </div>

      {/* Progress Bar */}
      {isScanning && (
        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
          <div
            className="bg-indigo-600 h-4 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Scan Results</h3>
          <table className="w-full text-left border border-gray-300 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Content</th>
                <th className="px-4 py-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Scan;
