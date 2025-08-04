"use client";

export default function ErrorDisplay({ 
  error, 
  title = "Error Loading Dashboard",
  onRetry 
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="text-red-500 text-6xl">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
} 