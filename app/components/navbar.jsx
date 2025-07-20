"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, PlusCircle } from "lucide-react"; // using lucide icons

const navLinks = [
  { name: "Dashboard", href: "/", icon: <Home size={20} /> },
  { name: "Transaction", href: "/transactions", icon: <PlusCircle size={20} /> },
  { name: "Reports", href: "/reports", icon: <TrendingUp size={20} /> },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-64 h-screen bg-gray-900 text-white p-6 fixed"
    >
      <h1 className="text-2xl font-bold mb-10">Trackify</h1>

      <nav className="space-y-4">
        {navLinks.map(({ name, href, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-800" : ""
              }`}
            >
              {icon}
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
