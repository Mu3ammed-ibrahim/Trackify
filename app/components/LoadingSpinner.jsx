"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ 
  message = "Loading...",
  size = "default" 
}) {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-indigo-600`} />
        <p className="text-gray-600 dark:text-gray-400">
          {message}
        </p>
      </div>
    </div>
  );
} 