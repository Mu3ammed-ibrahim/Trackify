"use client";

import { useAuth } from "@/app/components/AuthProvider";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/navbar";

export default function ClientLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();

  // Pages where sidebar should never show
  const authPages = ["/auth/login", "/auth/signup", "/auth/register"];
  const isAuthPage = authPages.some((page) => pathname.startsWith(page));

  // Show sidebar only if user is authenticated and not on auth pages
  const showSidebar = isAuthenticated && !isAuthPage;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {showSidebar && <Sidebar />}
      <main
        className={`main-content space-responsive overflow-y-auto min-h-screen ${
          showSidebar ? "pt-20 md:pt-0" : "!ml-0 !w-full"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
