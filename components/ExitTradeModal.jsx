"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ExitTradeModal({ trade, close, refresh }) {
  const [sellPrice, setSellPrice] = useState("");
  const [sellDate, setSellDate] = useState("");

  const exitTrade = async () => {
    if (!sellPrice || !sellDate) {
      toast.error("Enter sell price & date!");
      return;
    }

    const res = await fetch("/api/trades/exit-holding", {
      method: "POST",
      body: JSON.stringify({
        holdingId: trade._id,
        sellPrice,
        sellDate,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed");
      return;
    }

    toast.success("Trade closed!");
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex justify-center items-center z-[999]">
      <div className="bg-white dark:bg-[#0f172a] p-6 rounded-xl w-[90%] max-w-md shadow-xl">
        <h3 className="text-xl font-semibold mb-4">
          Exit Trade — {trade.asset}
        </h3>

        <div className="space-y-3">
          <input
            type="number"
            placeholder="Sell Price"
            className="w-full p-3 rounded bg-gray-200 dark:bg-gray-800"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
          />

          <input
            type="date"
            className="w-full p-3 rounded bg-gray-200 dark:bg-gray-800"
            value={sellDate}
            onChange={(e) => setSellDate(e.target.value)}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={close}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={exitTrade}
          >
            Exit Trade
          </button>
        </div>
      </div>
    </div>
  );
}
