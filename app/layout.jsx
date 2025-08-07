import "./globals.css";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import NavigationEvents from "@/app/components/NavigationEvents";

const RootLayoutWrapper = dynamic(
  () => import("@/app/components/RootLayoutWrapper"),
  {
    ssr: true,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
  }
);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-smooth antialiased`}>
        <NavigationEvents />
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
