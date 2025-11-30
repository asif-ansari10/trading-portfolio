// components/ExitModal.jsx
"use client";
import { useState } from "react";

export default function ExitModal({ open, onClose, holding, onDone }) {
  const [sellPrice, setSellPrice] = useState("");
  const [sellDate, setSellDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleExit = async () => {
    if (!sellPrice || !sellDate) return alert("Enter sell price and date");
    setLoading(true);
    try {
      const res = await fetch("/api/trades/exit-holding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ holdingId: holding._id, sellPrice, sellDate })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to exit holding");
      } else {
        onDone(data.completed);
      }
    } catch (err) {
      alert("Error exiting holding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#0b1220] p-6 rounded-xl w-[90%] max-w-md">
        <h3 className="text-lg font-semibold mb-4">Exit Holding — {holding.asset}</h3>

        <label className="block mb-2">Sell Price</label>
        <input
          type="number"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          className="w-full p-2 rounded mb-3 bg-gray-100 dark:bg-gray-800"
        />

        <label className="block mb-2">Sell Date</label>
        <input
          type="date"
          value={sellDate}
          onChange={(e) => setSellDate(e.target.value)}
          className="w-full p-2 rounded mb-4 bg-gray-100 dark:bg-gray-800"
        />

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">
            Cancel
          </button>
          <button
            onClick={handleExit}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            {loading ? "Processing..." : "Confirm Exit"}
          </button>
        </div>
      </div>
    </div>
  );
}
