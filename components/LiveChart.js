"use client";

import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function LiveChart({ symbol }) {
  const chartRef = useRef(null);

  useEffect(() => {
    async function load() {
      // create chart container
      const chart = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: 400,
        layout: {
          background: { color: "#ffffff" },
          textColor: "#111",
        },
        grid: {
          vertLines: { color: "#eee" },
          horzLines: { color: "#eee" },
        },
      });

      // ⭐ FIX: new API (works in latest version)
      const candle = chart.addSeries({
        type: "candlestick",
      });

      // Load data
      const res = await fetch(`/api/markets/history?symbol=${symbol}`);
      const data = await res.json();

      candle.setData(data);

      // Responsive chart
      const resize = () => {
        chart.applyOptions({ width: chartRef.current.clientWidth });
      };

      window.addEventListener("resize", resize);

      return () => {
        window.removeEventListener("resize", resize);
        chart.remove();
      };
    }

    load();
  }, [symbol]);

  return <div ref={chartRef} className="w-full h-[400px]" />;
}
