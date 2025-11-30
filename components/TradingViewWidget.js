"use client";

import { useEffect } from "react";

export default function TradingViewWidget({ symbol, onClose }) {

  useEffect(() => {
    // Inject TradingView script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "1",
          timezone: "Asia/Kolkata",
          theme: "dark",
          style: "1",
          locale: "en",
          container_id: "tv_chart_container",
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup when modal closes
      document.getElementById("tv_chart_container").innerHTML = "";
    };
  }, [symbol]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[9999]">

      <div className="bg-[#0b1220] rounded-xl w-[95%] max-w-4xl p-4 relative shadow-xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-2xl text-white hover:text-red-400 transition"
        >
          ✕
        </button>

        {/* Chart Container */}
        <div id="tv_chart_container" style={{ height: "500px" }} />
      </div>
    </div>
  );
}
