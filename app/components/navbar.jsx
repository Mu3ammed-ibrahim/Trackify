"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/app/redux/slices/themeSlice";
import { LogOut, Home, List, User, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClients";
import { useAuth } from "@/app/components/AuthProvider";
import toast from "react-hot-toast";


const links = [
  { href: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
  { href: "/transactions", label: "Transactions", icon: <List size={20} /> },
  { href: "/about", label: "About Me", icon: <User size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useSelector((state) => state.theme.value);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Error logging out");
        console.error("Logout error:", error);
      } else {
        toast.success("Logged out successfully");
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error("Error logging out");
      console.error("Logout error:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  // Only render if authenticated (this component should only be rendered when authenticated anyway)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed z-50 p-3 md:hidden top-4 left-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-responsive shadow-professional transition-smooth hover:scale-105 mobile-optimized safe-area"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-black/50 backdrop-blur-sm transition-smooth"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar-fixed sidebar-scroll w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-professional-lg z-40 transform transition-smooth border-r border-gray-200/50 dark:border-gray-700/50 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "md:translate-x-0 -translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full space-responsive">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-responsive shadow-professional">
                <span className="text-lg font-bold text-white">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                  Trackify
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Finance Tracker
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2.5 rounded-responsive bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-smooth mobile-optimized group"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon
                  size={18}
                  className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-smooth"
                />
              ) : (
                <Sun
                  size={18}
                  className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-smooth"
                />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {links.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={handleLinkClick}
                className={`flex items-center gap-4 px-4 py-3 rounded-responsive transition-smooth mobile-optimized group ${
                  pathname === href
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-professional"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div
                  className={`transition-smooth ${
                    pathname === href
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  }`}
                >
                  {icon}
                </div>
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="pt-6 mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-4 px-4 py-3 text-red-600 rounded-responsive hover:bg-red-50 dark:hover:bg-red-900/20 transition-smooth dark:text-red-400 mobile-optimized group"
            >
              <LogOut
                size={20}
                className="group-hover:scale-110 transition-smooth"
              />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
