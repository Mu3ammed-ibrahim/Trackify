"use client";

import { motion } from "framer-motion";
import Card from "@/app/components/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function StatsCards({ stats }) {
  const { balance, totalIncome, totalExpense } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card
          title="Balance"
          value={`$${balance.toFixed(2)}`}
          icon={<DollarSign className="w-5 h-5 md:w-6 md:h-6" />}
          color={balance >= 0 ? "text-green-600" : "text-red-600"}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card
          title="Total Income"
          value={`$${totalIncome.toFixed(2)}`}
          icon={<TrendingUp className="w-5 h-5 md:w-6 md:h-6" />}
          color="text-green-600"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="sm:col-span-2 lg:col-span-1"
      >
        <Card
          title="Total Expense"
          value={`$${totalExpense.toFixed(2)}`}
          icon={<TrendingDown className="w-5 h-5 md:w-6 md:h-6" />}
          color="text-red-600"
        />
      </motion.div>
    </div>
  );
}
