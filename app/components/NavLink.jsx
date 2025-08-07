"use client";

import { memo } from "react";
import Link from "next/link";

const NavLink = memo(({ href, isActive, children, onClick }) => (
  <Link
    href={href}
    prefetch={true}
    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
      isActive
        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        : "text-gray-600 dark:text-gray-400"
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
));

NavLink.displayName = "NavLink";

export default NavLink;
