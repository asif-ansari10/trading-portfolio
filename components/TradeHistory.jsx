"use client";

export default function TradeHistory({ holdings, completed }) {
  const all = [
    ...holdings.map((h) => ({ ...h, status: "Active" })),
    ...completed.map((c) => ({ ...c, status: "Closed" })),
  ];

  if (all.length === 0)
    return <p className="text-gray-400">No trades yet.</p>;

  return (
    <div className="mt-10 bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Trade History</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="p-3">Asset</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Status</th>
              <th className="p-3">Buy</th>
              <th className="p-3">Sell</th>
              <th className="p-3">P/L</th>
            </tr>
          </thead>

          <tbody>
            {all.map((t) => (
              <tr key={t._id} className="border-b border-gray-800">
                <td className="p-3">{t.asset}</td>
                <td className="p-3">{t.qty}</td>

                <td
                  className={`p-3 ${
                    t.status === "Active" ? "text-yellow-400" : "text-green-400"
                  }`}
                >
                  {t.status}
                </td>

                <td className="p-3">{t.buyPrice}</td>
                <td className="p-3">{t.sellPrice || "-"}</td>

                <td
                  className={`p-3 ${
                    t.profit >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {t.profit || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
