"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./navbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <div className="flex">
      {!isAuthRoute && <Sidebar />}
      <main className={`flex-1 ${!isAuthRoute ? "ml-64" : ""} p-6`}>{children}</main>
    </div>
  );
}
