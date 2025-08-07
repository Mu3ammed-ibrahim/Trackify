import "./globals.css";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
const NavigationEvents = dynamic(
  () => import("@/app/components/NavigationEvents"),
  { ssr: false }
);

const RootLayoutWrapper = dynamic(
  () => import("@/app/components/RootLayoutWrapper"),
  {
    ssr: true,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    ),
  }
);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-smooth antialiased`}>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
