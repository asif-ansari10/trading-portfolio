"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import KPIBox from "@/components/KPIBox";
import ChartComponent from "@/components/ChartComponent";
import CalendarHeatmap from "@/components/CalendarHeatmap";
import TradingHistory from "@/components/TradingHistory";
import ProfitStats from "@/components/ProfitStats";
import TradeCard from "@/components/TradeCard";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD TRADES ONLY WHEN LOGGED-IN
  useEffect(() => {
    async function fetchTrades() {
      try {
        if (!session) {
          setTrades([]);
          setLoading(false);
          return;
        }

        const res = await fetch("/api/trades/get");
        if (!res.ok) {
          setTrades([]);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setTrades(data.trades || []);
      } catch (err) {
        setTrades([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTrades();
  }, [session]);

  const totalProfit = trades.reduce(
    (sum, t) => sum + (Number(t.profit) || 0),
    0
  );

  const successRate = trades.length
    ? ((trades.filter((t) => Number(t.profit) > 0).length / trades.length) * 100).toFixed(1)
    : 0;

  return (
    <div className="pt-10 pb-20">

      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 dark:text-gray-100">
        Dashboard Overview
      </h1>

      {/* ALWAYS SHOW ZERO SCORE WHEN NOT LOGGED IN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPIBox title="Total Profit" value={`₹${totalProfit.toFixed(2)}`} icon="💰" />
        <KPIBox title="Total Trades" value={trades.length} icon="📊" />
        <KPIBox title="Success Rate" value={`${successRate}%`} icon="🔥" />
      </div>

      {/* HIDE actual data when not logged in */}
       (
        <>
          {/* MONTHLY PROFIT CHART */}
          <div className="mt-12 bg-white dark:bg-[#111827] shadow-xl rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">
              Monthly Profit Trend
            </h2>

            <ChartComponent
              data={trades.map((t) => Number(t.profit) || 0)}
              height={250}
            />
          </div>

          {/* RECENT TRADES */}
          <h2 className="text-2xl font-semibold dark:text-white mt-12 mb-6">
            Recent Trades (Last 10)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trades
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 10)
              .map((trade) => (
                <TradeCard key={trade._id} trade={trade} />
              ))}
          </div>

          {/* CALENDAR HEATMAP */}
          <div className="mt-16">
            <CalendarHeatmap trades={trades} />
          </div>

          {/* TRADING HISTORY */}
          <div className="mt-16">
            <TradingHistory trades={trades} />
          </div>

          {/* PROFIT STATS */}
          <div className="mt-16">
            <ProfitStats trades={trades} />
          </div>
        </>
      )

    </div>
  );
}