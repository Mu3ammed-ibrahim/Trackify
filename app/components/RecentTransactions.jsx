"use client";

import { motion } from "framer-motion";

export default function RecentTransactions({ transactions, maxItems = 5 }) {
  if (!transactions || transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
          Recent Transactions
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No transactions yet. Start by adding your first transaction!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
        Recent Transactions
      </h2>
      <ul className="space-y-2 md:space-y-3">
        {transactions.slice(0, maxItems).map(({ id, description, amount, category, created_at }) => (
          <motion.li
            key={id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-between items-center p-3 md:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-white text-sm md:text-base truncate">
                {description || "No description"}
              </p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {new Date(created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <span
              className={`font-semibold text-sm md:text-base ml-2 ${
                category === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {category === "income" ? "+" : "-"}${amount.toFixed(2)}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
} 