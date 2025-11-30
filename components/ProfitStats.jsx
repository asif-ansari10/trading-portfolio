export default function ProfitStats({ trades }) {

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  // Filter monthly trades
  const monthlyTrades = trades.filter(t => {
    const d = new Date(t.sellDate || t.date);
    return (
      d.getMonth() === thisMonth &&
      d.getFullYear() === thisYear
    );
  });

  const profits = monthlyTrades.map(t => Number(t.profit) || 0);

  const totalProfit = profits.reduce((s, p) => s + p, 0);

  const successRate = monthlyTrades.length
    ? (
        (monthlyTrades.filter(t => Number(t.profit) > 0).length /
          monthlyTrades.length) *
        100
      ).toFixed(1)
    : "0";

  return (
    <div className="p-6 rounded-xl bg-white dark:bg-[#111827] border dark:border-gray-700">

      <h2 className="text-2xl font-semibold mb-6">
        Monthly Profitability
      </h2>

      <div className="flex flex-col items-center">
        
        {/* Circle Meter */}
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
