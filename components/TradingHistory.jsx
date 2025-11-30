"use client";

export default function TradingHistory({ trades = [] }) {
  const topTrades = trades
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return (
    <div className="bg-white dark:bg-[#0d1628] rounded-xl shadow-lg p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Trading History (Last 10)
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        
        <table className="min-w-full text-left border-collapse">

          {/* HEADER */}
          <thead className="bg-gray-100 dark:bg-[#152036] text-gray-700 dark:text-gray-300 text-sm">
            <tr>
              <th className="py-4 px-4 whitespace-nowrap">Asset</th>
              <th className="py-4 px-4 whitespace-nowrap">Type</th>
              <th className="py-4 px-4 whitespace-nowrap">Buy</th>
              <th className="py-4 px-4 whitespace-nowrap">Sell</th>
              <th className="py-4 px-4 whitespace-nowrap">Date</th>
              <th className="py-4 px-4 whitespace-nowrap">P/L</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="text-gray-800 dark:text-gray-200 text-sm">

            {topTrades.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400 dark:text-gray-500">
                  No trading history available.
                </td>
              </tr>
            ) : (
              topTrades.map((t) => (
                <tr
                  key={t._id}
                  className="border-t border-gray-200 dark:border-gray-700 
                             hover:bg-gray-100 dark:hover:bg-gray-800/40 
                             transition md:text-sm text-base"
                >
                  {/* ASSET NAME */}
                  <td className="py-5 px-4 font-medium max-w-[200px] whitespace-normal leading-6">
                    {t.asset}
                  </td>

                  {/* TYPE */}
                  <td
                    className={`py-5 px-4 font-semibold ${
                      t.tradeType === "Buy" ? "text-green-500" : "text-red-400"
                    }`}
                  >
                    {t.tradeType}
                  </td>

                  {/* BUY PRICE */}
                  <td className="py-5 px-4">{t.buyPrice ? `₹${t.buyPrice}` : "-"}</td>

                  {/* SELL PRICE */}
                  <td className="py-5 px-4">
                    {t.sellPrice ? `₹${t.sellPrice}` : "-"}
                  </td>

                  {/* DATE */}
                  <td className="py-5 px-4 whitespace-nowrap">
                    {t.createdAt
                      ? new Date(t.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* PROFIT */}
                  <td
                    className={`py-5 px-4 font-bold ${
                      Number(t.profit) > 0
                        ? "text-green-500"
                        : Number(t.profit) < 0
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {t.profit ? `₹${t.profit}` : "0"}
                  </td>
                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}