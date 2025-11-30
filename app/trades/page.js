"use client";

import { useEffect, useState } from "react";

export default function TradesPage() {
  const [holdings, setHoldings] = useState([]);
  const [completed, setCompleted] = useState([]);

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetch("/api/trades/get-trades")
      .then((res) => res.json())
      .then((data) => {
        setHoldings(data.holdings || []);
        setCompleted(data.completed || []);
      });
  }, []);

  // Filter by date
  const filterByDate = (list) =>
    list.filter((t) => {
      const d = new Date(t.buyDate);

      if (fromDate && d < new Date(fromDate)) return false;
      if (toDate && d > new Date(toDate)) return false;

      return true;
    });

  return (
    <div className="px-6 py-10 min-h-screen bg-gray-100 dark:bg-[#0d1628] transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        All Trades
      </h1>

      {/* FILTERS */}
      <div className="bg-white dark:bg-[#111827] p-6 rounded-xl border border-gray-300 dark:border-gray-700 shadow mb-10 transition-colors">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Filter Trades by Date
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* From Date */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              From Date
            </label>
            <input
              type="date"
              className="bg-gray-200 dark:bg-[#1f2937] text-gray-900 dark:text-white 
                         p-3 rounded-lg border border-gray-400 dark:border-gray-600 
                         focus:border-blue-500 outline-none transition-all"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* To Date */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              To Date
            </label>
            <input
              type="date"
              className="bg-gray-200 dark:bg-[#1f2937] text-gray-900 dark:text-white 
                         p-3 rounded-lg border border-gray-400 dark:border-gray-600 
                         focus:border-blue-500 outline-none transition-all"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {/* Reset Button */}
          <div className="flex flex-col justify-end">
            <button
              onClick={() => {
                setFromDate("");
                setToDate("");
              }}
              className="bg-red-600 hover:bg-red-700 transition-all text-white py-3 rounded-lg font-semibold"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE HOLDINGS TABLE */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Active Holdings
        </h2>

        {holdings.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No active holdings.</p>
        ) : (
          <div className="overflow-auto bg-white dark:bg-[#111827] rounded-xl 
                          border border-gray-300 dark:border-gray-700 shadow transition-colors">
            <table className="min-w-full text-left">
              <thead className="text-gray-700 dark:text-gray-300 text-sm uppercase border-b border-gray-300 dark:border-gray-700">
                <tr>
                  <th className="p-3">Asset</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Buy Price</th>
                  <th className="p-3">Target</th>
                  <th className="p-3">Buy Date</th>
                  <th className="p-3">Summary</th>
                </tr>
              </thead>

              <tbody>
                {filterByDate(holdings).map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 font-semibold text-gray-900 dark:text-white">{item.asset}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">{item.tradeType}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">{item.quantity}</td>
                    <td className="p-3 text-green-600 dark:text-green-400">₹{item.buyPrice}</td>
                    <td className="p-3 text-gray-800 dark:text-gray-300">₹{item.targetPrice}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-400">
                      {new Date(item.buyDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">
                      {item.summary || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* COMPLETED TRADES TABLE */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Completed Trades
        </h2>

        {completed.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No completed trades.</p>
        ) : (
          <div className="overflow-auto bg-white dark:bg-[#111827] rounded-xl 
                          border border-gray-300 dark:border-gray-700 shadow transition-colors">
            <table className="min-w-full text-left">
              <thead className="text-gray-700 dark:text-gray-300 text-sm uppercase border-b border-gray-300 dark:border-gray-700">
                <tr>
                  <th className="p-3">Asset</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Buy Price</th>
                  <th className="p-3">Sell Price</th>
                  <th className="p-3">Profit</th>
                  <th className="p-3">Buy Date</th>
                  <th className="p-3">Sell Date</th>
                  <th className="p-3">Summary</th>
                </tr>
              </thead>

              <tbody>
                {filterByDate(completed).map((trade) => (
                  <tr key={trade._id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 font-semibold text-gray-900 dark:text-white">
                      {trade.asset}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">{trade.quantity}</td>
                    <td className="p-3 text-green-600 dark:text-green-400">₹{trade.buyPrice}</td>
                    <td className="p-3 text-yellow-600 dark:text-yellow-400">₹{trade.sellPrice}</td>
                    <td
                      className={`p-3 font-bold ${
                        trade.profit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      ₹{trade.profit}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-400">
                      {new Date(trade.buyDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-400">
                      {new Date(trade.sellDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">
                      {trade.summary || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
