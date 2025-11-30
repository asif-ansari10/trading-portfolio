export default function ProfitStats({ trades }) {

  // Convert undefined/null profit → 0
  const safeProfits = trades.map(t => Number(t.profit) || 0);

  const totalProfit = safeProfits.reduce((sum, p) => sum + p, 0);

  const successCount = trades.filter(t => Number(t.profit) > 0).length;
  const successRate = trades.length
    ? ((successCount / trades.length) * 100).toFixed(1)
    : "0";

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-[#111827] border dark:border-gray-700">

      <h2 className="text-2xl font-semibold mb-6">
        Profitability
      </h2>

      <div className="flex flex-col items-center">
        {/* Circle Profit Meter */}
        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-red-500 to-green-500 flex items-center justify-center text-white text-3xl font-bold">
          ₹{totalProfit.toFixed(2)}
        </div>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Success Rate: <span className="font-semibold">{successRate}%</span>
        </p>

      </div>
    </div>
  );
}
