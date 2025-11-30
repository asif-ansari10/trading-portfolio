"use client";

import { useState } from "react";
import ExitTradeModal from "./ExitTradeModal";

export default function HoldingsTable({ holdings, refreshData }) {
  const [exitModal, setExitModal] = useState(null);

  if (!holdings || holdings.length === 0)
    return <p className="text-gray-400">No active holdings.</p>;

  return (
    <div className="mt-6 bg-white dark:bg-[#0f172a] p-5 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Active Holdings</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="p-3">Asset</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Buy Price</th>
              <th className="p-3">Buy Date</th>
              <th className="p-3">Target</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((h) => (
              <tr key={h._id} className="border-b border-gray-800">
                <td className="p-3">{h.asset}</td>
                <td className="p-3">{h.qty}</td>
                <td className="p-3">{h.buyPrice}</td>
                <td className="p-3">{h.buyDate}</td>
                <td className="p-3">{h.targetPrice || "-"}</td>
                <td className="p-3">
                  <button
                    onClick={() => setExitModal(h)}
                    className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Exit Trade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {exitModal && (
        <ExitTradeModal
          trade={exitModal}
          close={() => setExitModal(null)}
          refresh={refreshData}
        />
      )}
    </div>
  );
}
