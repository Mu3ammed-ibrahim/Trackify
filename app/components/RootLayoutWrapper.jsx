"use client";

import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import ThemeProvider from "@/app/components/ThemeProvider";
import { AuthProvider } from "@/app/components/AuthProvider";
import { Toaster } from "react-hot-toast";
import ClientLayout from "./ClientLayout";

export default function RootLayoutWrapper({ children }) {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
