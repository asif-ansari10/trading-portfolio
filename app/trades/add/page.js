"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddTradePage() {
  const router = useRouter();

  // -------------------------
  // STATES
  // -------------------------
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [asset, setAsset] = useState(""); // final asset OR placeholder
  const [customAsset, setCustomAsset] = useState("");

  const [category, setCategory] = useState("HOLDING"); // HOLDING | COMPLETE
  const [tradeType, setTradeType] = useState("N/A");

  const [buyPrice, setBuyPrice] = useState("");
  const [buyDate, setBuyDate] = useState("");

  const [targetPrice, setTargetPrice] = useState("");

  const [sellPrice, setSellPrice] = useState("");
  const [sellDate, setSellDate] = useState("");

  const [qty, setQty] = useState("");
  const [summary, setSummary] = useState("");

  // -------------------------
  // SEARCH API
  // -------------------------
  useEffect(() => {
    if (search.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchResults = async () => {
      const res = await fetch(`/api/markets/search?q=${search}`);
      const data = await res.json();
      setSuggestions(data || []);
    };

    fetchResults();
  }, [search]);

  // -------------------------
  // SUBMIT HANDLER
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalAsset = asset === "OTHER" ? customAsset : asset;

    if (!finalAsset) {
      toast.error("Please select or enter an asset");
      return;
    }

    const payload = {
      asset: finalAsset,
      category,
      qty,
      tradeType: category === "HOLDING" ? tradeType : "N/A",

      buyPrice,
      buyDate,

      ...(category === "HOLDING" && { targetPrice }),
      ...(category === "COMPLETE" && { sellPrice, sellDate }),

      summary,
    };

    const res = await fetch("/api/trades/add-advanced", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to save");
      return;
    }

    toast.success("Trade Saved");
    router.push("/trades");
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Add Trade</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* SEARCH BOX */}
        <div>
          <label className="font-semibold">Search Asset</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-900 mt-1"
            placeholder="Search stock, index, commodity..."
          />

          {suggestions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 shadow rounded mt-2 max-h-60 overflow-auto">
              {suggestions.map((s) => (
                <div
                  key={s.symbol}
                  onClick={() => {
                    const chosen = s.shortname || s.symbol;
                    setAsset(chosen);  // Set asset
                    setSearch("");     // Hide suggestion box
                    setSuggestions([]);
                  }}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {s.shortname} ({s.symbol})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ASSET DROPDOWN */}
        <div>
          <label className="font-semibold">Asset</label>

          <select
            className="w-full p-3 rounded-lg dark:bg-gray-900 mt-1"
            value={asset}
            onChange={(e) => {
              setAsset(e.target.value);
              if (e.target.value !== "OTHER") setCustomAsset("");
            }}
          >
            <option value="">Select Asset</option>

            {/* Auto-added selected asset */}
            {asset && asset !== "OTHER" && (
              <option value={asset}>{asset}</option>
            )}

            <option value="OTHER">Other (Manual)</option>
          </select>

          {asset === "OTHER" && (
            <input
              value={customAsset}
              onChange={(e) => setCustomAsset(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-900 mt-2"
              placeholder="Enter your custom asset"
            />
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <label className="font-semibold">Trade Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg dark:bg-gray-900 mt-1"
          >
            <option value="HOLDING">Holding</option>
            <option value="COMPLETE">Trade Complete</option>
          </select>
        </div>

        {/* TRADE TYPE */}
        {category === "HOLDING" && (
          <div>
            <label className="font-semibold">Trade Type</label>
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value)}
              className="w-full p-3 rounded-lg dark:bg-gray-900 mt-1"
            >
              <option value="N/A">N/A</option>
              <option value="CALL">CALL</option>
              <option value="PUT">PUT</option>
            </select>
          </div>
        )}

        {/* QTY */}
        <div>
          <label className="font-semibold">Quantity</label>
          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            type="number"
            className="w-full p-3 rounded-lg dark:bg-gray-900 mt-1"
          />
        </div>

        {/* BUY DETAILS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Buy Price</label>
            <input
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              type="number"
              className="w-full p-3 rounded-lg dark:bg-gray-900 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Buy Date</label>
            <input
              value={buyDate}
              onChange={(e) => setBuyDate(e.target.value)}
              type="date"
              className="w-full p-3 rounded-lg dark:bg-gray-900 mt-1"
            />
          </div>
        </div>

        {/* TARGET PRICE */}
        {category === "HOLDING" && (
          <div>
            <label className="font-semibold">Target Price</label>
            <input
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              type="number"
              className="w-full p-3 rounded-lg dark:bg-gray-900 mt-1"
            />
          </div>
        )}

        {/* SELL DETAILS */}
        {category === "COMPLETE" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Sell Price</label>
              <input
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                type="number"
                className="w-full p-3 rounded-lg dark:bg-gray-900 mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Sell Date</label>
              <input
                value={sellDate}
                onChange={(e) => setSellDate(e.target.value)}
                type="date"
                className="w-full p-3 rounded-lg dark:bg-gray-900 mt-1"
              />
            </div>
          </div>
        )}

        {/* SUMMARY */}
        <div>
          <label className="font-semibold">Remarks / Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-lg dark:bg-gray-900 mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Save Trade
        </button>

      </form>
    </div>
  );
}
