// frontend/src/components/DashboardCharts.jsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"]; // green, yellow, red

export default function DashboardCharts({ summary }) {
  const data = [
    { name: "Safe", value: summary.safeCount || 0 },
    { name: "Private", value: summary.privateCount || 0 },
    { name: "Flagged", value: summary.flaggedCount || 0 },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h4 className="font-semibold text-indigo-600">Reputation</h4>
      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex justify-between text-sm text-gray-600 dark:text-gray-300">
        <div>
          Score: <strong>{summary.reputationScore ?? "-"}</strong>
        </div>
        <div>Safe: {summary.safeCount ?? 0}</div>
      </div>
    </div>
  );
}
