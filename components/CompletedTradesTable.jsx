"use client";

export default function CompletedTradesTable({ trades }) {
  if (!trades || trades.length === 0)
    return <p className="text-gray-400">No completed trades.</p>;

  return (
    <div className="mt-10 bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Completed Trades</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="p-3">Asset</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Buy</th>
              <th className="p-3">Sell</th>
              <th className="p-3">Buy Date</th>
              <th className="p-3">Sell Date</th>
              <th className="p-3">P/L</th>
            </tr>
          </thead>

          <tbody>
            {trades.map((t) => (
              <tr key={t._id} className="border-b border-gray-800">
                <td className="p-3">{t.asset}</td>
                <td className="p-3">{t.qty}</td>
                <td className="p-3">{t.buyPrice}</td>
                <td className="p-3">{t.sellPrice}</td>
                <td className="p-3">{t.buyDate}</td>
                <td className="p-3">{t.sellDate}</td>

                <td
                  className={`p-3 font-bold ${
                    t.profit >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {t.profit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
