"use client";
import { useEffect } from "react";

export default function TradingViewChart({ symbol }) {
  useEffect(() => {
    if (!symbol) return;

    // Load TradingView script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (document.getElementById("tv_chart_container")) {
        new TradingView.widget({
          container_id: "tv_chart_container",
          autosize: true,
          symbol: symbol, // Must be NSE:NIFTY etc.
          interval: "30",
          timezone: "Asia/Kolkata",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#000000",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: false,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.getElementById("tv_chart_container")?.remove();
    };
  }, [symbol]);

  return <div id="tv_chart_container" className="w-full h-[600px]"></div>;
}
