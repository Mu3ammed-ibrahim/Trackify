"use client";

import { motion } from "framer-motion";

export default function WelcomeMessage({ 
  title = "Welcome back! 👋", 
  subtitle = "Here's your financial overview" 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        {subtitle}
      </p>
    </motion.div>
  );
} 