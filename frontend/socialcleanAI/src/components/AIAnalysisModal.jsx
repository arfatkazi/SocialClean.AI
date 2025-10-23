import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIAnalysisModal({ open, onClose, scan }) {
  if (!open || !scan) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 p-6 relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              AI Scan Results
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition"
            >
              ✕
            </button>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/40">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                {scan.summary?.safeCount || 0}
              </p>
              <p className="text-sm">Safe</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/40">
              <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {scan.summary?.privateCount || 0}
              </p>
              <p className="text-sm">Private</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/40">
              <p className="text-lg font-bold text-red-600 dark:text-red-400">
                {scan.summary?.flaggedCount || 0}
              </p>
              <p className="text-sm">Offensive</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {scan.summary?.reputationScore || 100}
              </p>
              <p className="text-sm">Reputation</p>
            </div>
          </div>

          {/* Detailed Items */}
          <div className="overflow-x-auto max-h-[400px]">
            <table className="w-full text-left border border-gray-300 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-sm">Platform</th>
                  <th className="px-4 py-2 text-sm">Type</th>
                  <th className="px-4 py-2 text-sm">Content</th>
                  <th className="px-4 py-2 text-sm">Category</th>
                  <th className="px-4 py-2 text-sm">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {scan.items?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-2">{item.platform}</td>
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
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                      {item.confidence || "--"}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
