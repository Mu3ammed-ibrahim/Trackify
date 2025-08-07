"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";

// Dynamically import heavy components
const ThemeProvider = dynamic(() => import("@/app/components/ThemeProvider"), {
  ssr: false,
});
const AuthProvider = dynamic(
  () => import("@/app/components/AuthProvider").then((mod) => mod.AuthProvider),
  {
    ssr: false,
  }
);
const ClientLayout = dynamic(() => import("./ClientLayout"), {
  ssr: false,
});
const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  {
    ssr: false,
  }
);

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
  </div>
);

export default function RootLayoutWrapper({ children }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Provider store={store}>
        <Suspense fallback={<LoadingFallback />}>
          <ThemeProvider>
            <AuthProvider>
              <ClientLayout>{children}</ClientLayout>
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
            </AuthProvider>
          </ThemeProvider>
        </Suspense>
      </Provider>
    </Suspense>
  );
}
