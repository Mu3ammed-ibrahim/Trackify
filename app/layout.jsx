"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/app/components/navbar";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import ThemeProvider from "./components/ThemeProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-smooth antialiased`}>
        <Provider store={store}>
          <ThemeProvider>
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
              <Sidebar />
              <main className="main-content flex-1 space-responsive overflow-y-auto min-h-screen pt-20 md:pt-0">
                {children}
              </main>
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#1f2937",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: "#10b981",
                    secondary: "#fff",
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
