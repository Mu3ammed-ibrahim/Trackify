"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#22c55e", "#ef4444"];

export default function PieChartComponent({
  data,
  title = "Income vs Expense",
}) {
  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>No data to display</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              innerRadius={30}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${value.toFixed(2)}`, "Amount"]}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                color: "#374151",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
