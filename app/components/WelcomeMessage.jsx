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
      className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm mt-2"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white dark:text-white">
        {title}
      </h1>
      <p className="text-white dark:text-gray-400">
        {subtitle}
      </p>
    </motion.div>
  );
} 