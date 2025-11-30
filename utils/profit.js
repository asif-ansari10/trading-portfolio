// utils/profit.js
export function monthlyAggregation(completedTrades) {
  // completedTrades: array of { sellDate, profit }
  // returns { "YYYY-MM": totalProfit, ... } sorted ascending by month
  const map = {};
  completedTrades.forEach((t) => {
    const date = new Date(t.sellDate);
    if (isNaN(date)) return;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    map[key] = (map[key] || 0) + (t.profit || 0);
  });

  const entries = Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  return entries.map(([month, profit]) => ({ month, profit }));
}
