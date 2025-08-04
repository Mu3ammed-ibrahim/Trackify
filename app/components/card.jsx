export default function Card({
  title,
  value,
  icon,
  color = "text-gray-900 dark:text-white",
}) {
  return (
    <section className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className={`text-lg md:text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div
          className={`p-2 md:p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${color}`}
        >
          {icon}
        </div>
      </div>
    </section>
  );
}
