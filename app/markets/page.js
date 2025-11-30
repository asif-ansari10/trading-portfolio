"use client";

import { useState, useEffect } from "react";
import TVChart from "@/components/TVChart";

export default function MarketsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [prices, setPrices] = useState({});
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ---------------------------------------
  // TradingView Symbols (For Charts Only)
  // ---------------------------------------
const symbols = {
  indices: [
  { name: "Nifty 50", tvSymbol: "NSE:NIFTY50", nseName: "NIFTY 50" },
  { name: "Bank Nifty", tvSymbol: "NSE:NIFTYBANK", nseName: "NIFTY BANK" },
  { name: "Sensex", tvSymbol: "BSE:SENSEX", nseName: "S&P BSE SENSEX" },
],


commodities: [
  { name: "Gold (XAUUSD)", tvSymbol: "FX_IDC:XAUUSD", apiSymbol: "XAUUSD" },
  { name: "Silver (XAGUSD)", tvSymbol: "FX_IDC:XAGUSD", apiSymbol: "XAGUSD" },
  { name: "Crude Oil (WTI)", tvSymbol: "TVC:USOIL", apiSymbol: "CL=F" },
],


};



  // ---------------------------------------
  // Load NSE Indices (NIFTY, BANKNIFTY, SENSEX)
  // ---------------------------------------
  const loadNSE = async () => {
    try {
      const res = await fetch("/api/markets/nse");
      const data = await res.json();

      const mapped = {};
      data.data.forEach((item) => {
        mapped[item.index.trim().toUpperCase()] = {
  price: item.last,
  high: item.high,
  low: item.low,
  change: item.change,
  percent: item.pChange,
};

      });

      setPrices((prev) => ({ ...prev, ...mapped }));
    } catch (e) {
      console.log("NSE fetch error:", e);
    }
  };

  // ---------------------------------------
  // Load Price for Commodities & Stocks
  // ---------------------------------------
const commodityYahooMap = {
  "FXCM:XAUUSD": "GC=F",
  "FXCM:XAGUSD": "SI=F",
  "FXCM:USOIL": "CL=F",
};

  const loadPrice = async (symbol) => {
  try {
    const yahooSymbol = commodityYahooMap[symbol] || symbol;
    const res = await fetch(`/api/markets/quote?symbol=${yahooSymbol}`);
    const data = await res.json();

    setPrices((prev) => ({ ...prev, [symbol]: data }));
  } catch (e) {
    console.log("Price error:", e);
  }
};


  useEffect(() => {
    loadNSE();
    symbols.commodities.forEach((item) => loadPrice(item.yahooSymbol));

  }, []);

  // ---------------------------------------
  // Search Stocks / Commodities / Indices
  // ---------------------------------------
  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearch(val);

    if (val.length < 2) return setSuggestions([]);

    try {
      const res = await fetch(`/api/markets/search?q=${val}`);
      const data = await res.json();
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    }
  };

  // ---------------------------------------
  // Market Card Component
  // ---------------------------------------
  const MarketBox = ({ title, item, data }) => {
    const change = data?.change ?? 0;
    const percent = data?.percent ?? 0;
    const isUp = change > 0;

    return (
      <div
        onClick={() => setSelectedSymbol(item.tvSymbol)}
        className="p-5 bg-white dark:bg-[#0b1220] border dark:border-gray-700 shadow-lg rounded-2xl cursor-pointer hover:scale-[1.02] transition"
      >
        <h3 className="font-bold text-xl dark:text-white">{title}</h3>

        {!data ? (
          <p className="text-gray-500 mt-2">Loading...</p>
        ) : (
          <>
            <p className="text-2xl font-bold dark:text-white mt-2">
  {data.price ? data.price : "—"}
</p>

<p className={`mt-1 font-semibold ${isUp ? "text-green-500" : "text-red-500"}`}>
  {data.change ?? "0"} ({data.percent ?? "0"}%)
</p>

<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
  High: {data.high ?? "—"} | Low: {data.low ?? "—"}
</p>

          </>
        )}
      </div>
    );
  };

  // ---------------------------------------
  // Render Page
  // ---------------------------------------
  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Search Box */}
      <input
        value={search}
        onChange={handleSearch}
        placeholder="Search stocks, indices, commodities..."
        className="w-full p-3 rounded-xl border dark:bg-[#0f1629] dark:border-gray-700 mb-4 dark:text-white"
      />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white dark:bg-[#0b1220] border dark:border-gray-700 rounded-xl shadow p-3 mb-6">
          {suggestions.map((s) => (
            <div
              key={s.symbol}
              onClick={() => {
                setSelectedSymbol(s.symbol);
                setSearch("");
                setSuggestions([]);
              }}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded cursor-pointer"
            >
              {s.shortname || s.name} ({s.symbol})
            </div>
          ))}
        </div>
      )}

      {/* Indian Indices */}
      <h2 className="text-xl font-bold mb-3 dark:text-white">📊 Indian Indices</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {symbols.indices.map((item) => (
          <MarketBox
            key={item.name}
            title={item.name}
            item={item}
            data={prices[item.nseName.toUpperCase()]}
          />
        ))}
      </div>

      {/* Commodities */}
      <h2 className="text-xl font-bold mb-3 dark:text-white">🪙 Commodities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {symbols.commodities.map((item) => (
          <MarketBox
            key={item.name}
            title={item.name}
            item={item}
            data={prices[item.yahooSymbol]}

          />
        ))}
      </div>

      {/* Live Chart */}
      {selectedSymbol && (
        <div className="bg-white dark:bg-[#0b1220] p-6 border dark:border-gray-700 shadow-xl rounded-2xl">
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            Live Chart — {selectedSymbol}
          </h2>
          <TVChart symbol={selectedSymbol} />
        </div>
      )}
    </div>
  );
}
