"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  Users,
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Track Income & Expenses",
      description:
        "Easily record and categorize your financial transactions with a simple, intuitive interface.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Visual Analytics",
      description:
        "Get insights into your spending patterns with beautiful charts and detailed breakdowns.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description:
        "Your financial data is protected with industry-standard security and encryption.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Dashboard",
      description:
        "Monitor your financial health with real-time updates and comprehensive overviews.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Responsive",
      description:
        "Lightning-fast performance with a modern, responsive design that works on all devices.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User-Friendly",
      description:
        "Designed with simplicity in mind, making financial tracking accessible to everyone.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">About Trackify</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Your personal finance companion designed to help you take control of
            your money with powerful tracking tools and beautiful
            visualizations.
          </p>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
          We believe that everyone deserves to have a clear understanding of
          their financial situation. Trackify was built to make personal finance
          management simple, accessible, and even enjoyable. Whether you're just
          starting your financial journey or you're a seasoned budgeter, our
          tools help you make informed decisions about your money.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-indigo-600 dark:text-indigo-400">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Built with Modern Technology
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl">⚛️</div>
            <h3 className="font-semibold">React</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modern UI Framework
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl">🚀</div>
            <h3 className="font-semibold">Next.js</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full-Stack Framework
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl">🎨</div>
            <h3 className="font-semibold">Tailwind CSS</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Utility-First CSS
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl">🗄️</div>
            <h3 className="font-semibold">Supabase</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Backend & Database
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact/Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Get Started Today</h2>
        <p className="text-lg mb-6 text-green-100">
          Join thousands of users who are already taking control of their
          finances with Trackify.
        </p>
        <div className="space-y-4">
          <p className="text-green-100">
            Ready to start your financial journey?
          </p>
          <p className="text-sm text-green-200">
            Trackify is completely free to use and always will be.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
