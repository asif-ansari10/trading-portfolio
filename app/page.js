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
  const { data: session } = useSession();

  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD TRADES
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

  // ------------------------------
  // MONTH-WISE CALCULATION
  // ------------------------------
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Filter trades for THIS month
  const monthlyTrades = trades.filter((t) => {
    const d = new Date(t.sellDate || t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  // Total Monthly Profit
  const totalProfit = monthlyTrades.reduce(
    (sum, t) => sum + (Number(t.profit) || 0),
    0
  );

  //sort 
const sortedMonthlyTrades = [...monthlyTrades].sort(
  (a, b) => new Date(a.sellDate || a.date) - new Date(b.sellDate || b.date)
);
  // Monthly success rate
  const successRate = monthlyTrades.length
    ? (
        (monthlyTrades.filter((t) => Number(t.profit) > 0).length /
          monthlyTrades.length) *
        100
      ).toFixed(1)
    : 0;
// DEBUG: Check trades and profit types
console.log("Monthly Trades: ", monthlyTrades);
console.log("Profit Types:", monthlyTrades.map(t => typeof t.profit));
console.log("Raw Profits:", monthlyTrades.map(t => t.profit));
  // Monthly total trades
  const totalMonthlyTrades = monthlyTrades.length;

  return (
    <div className="pt-10 pb-20">

      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 dark:text-gray-100">
        Dashboard Overview
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPIBox title="Total Profit (This Month)" value={`₹${totalProfit.toFixed(2)}`} icon="💰" />
        <KPIBox title="Total Trades (This Month)" value={totalMonthlyTrades} icon="📊" />
        <KPIBox title="Success Rate (This Month)" value={`${successRate}%`} icon="🔥" />
      </div>

      {/* ONLY SHOW DATA IF LOGGED IN */}
      
        <>
          {/* MONTHLY PROFIT CHART */}
          <div className="mt-12 bg-white dark:bg-[#111827] shadow-xl rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">
              Monthly Profit Trend
            </h2>

            {monthlyTrades.length > 0 && (





<ChartComponent
  data={sortedMonthlyTrades.map((t) => Number(t.profit) || 0)}
  height={250}
/>

)}
            
          </div>

          {/* RECENT TRADES */}
          <h2 className="text-2xl font-semibold dark:text-white mt-12 mb-6">
            Recent Trades (Last 10)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trades
              .sort((a, b) => new Date(b.sellDate) - new Date(a.sellDate))
              .slice(0, 10)
              .map((trade) => (
                <TradeCard key={trade._id} trade={trade} />
              ))}
          </div>

          {/* CALENDAR HEATMAP */}
          <div className="mt-16">
            <CalendarHeatmap trades={monthlyTrades} />
          </div>

           {/* FULL TRADING HISTORY */}
          <div className="mt-16">
            <TradingHistory trades={trades} />
          </div>
          
          {/* MONTHLY PROFIT STATS */}
          <div className="mt-16">
            <ProfitStats trades={monthlyTrades} />
          </div>

         
        </>
    </div>
  );
}
