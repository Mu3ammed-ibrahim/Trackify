
export default function Home() {
  return (
    <section className="p-4 grid gap-6 md:grid-cols-3">
  <div className="md:col-span-2">
    <h2 className="text-xl font-bold mb-4">Overview</h2>
    <YourChartComponent />
  </div>

  <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
    <h3 className="font-semibold mb-2">Balance</h3>
    <p className="text-2xl font-bold text-green-500">$1,230.00</p>
  </div>

  <div className="md:col-span-3">
    <RecentTransactions />
  </div>
</section>

  );
}


