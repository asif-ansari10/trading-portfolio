// "use client";

// import { useEffect, useRef } from "react";

// export default function TVChart({ symbol }) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!symbol) return;

//     // Remove old chart
//     if (containerRef.current) {
//       containerRef.current.innerHTML = "";
//     }

//     // Load TradingView global script ONLY ONCE
//     if (!window.tvScriptLoaded) {
//       const script = document.createElement("script");
//       script.src = "https://s3.tradingview.com/tv.js";
//       script.onload = () => {
//         window.tvScriptLoaded = true;
//         createChart();
//       };
//       document.body.appendChild(script);
//     } else {
//       createChart();
//     }

//     function createChart() {
//       if (!window.TradingView) return;

//       new window.TradingView.widget({
//         autosize: true,
//         symbol: symbol,
//         interval: "D",
//         timezone: "Asia/Kolkata",
//         theme: "dark",
//         style: "1",
//         toolbar_bg: "#000000",
//         hide_top_toolbar: false,
//         hide_legend: false,
//         container_id: "tv_chart_container",
//       });
//     }
//   }, [symbol]);

//   return (
//     <div
//       id="tv_chart_container"
//       ref={containerRef}
//       style={{
//         height: "500px",
//         width: "100%",
//       }}
//     />
//   );
// }

"use client";

import { useEffect, useRef } from "react";

export default function TVChart({ symbol }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!symbol) return;

    // Clear old chart
    containerRef.current.innerHTML = "";

    // Add script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      new window.TradingView.widget({
        autosize: true,
        symbol,
        interval: "D",
        timezone: "Asia/Kolkata",
        theme: "dark",
        style: "1",
        container_id: "tv_chart_container",
      });
    };

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      id="tv_chart_container"
      ref={containerRef}
      style={{ height: "500px", width: "100%" }}
    />
  );
}
