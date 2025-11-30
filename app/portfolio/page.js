// app/(your)/portfolio/page.jsx  (or pages/portfolio.js) — client
"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import ExitModal from "@/components/ExitModal";

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

const load = async () => {
  try {
    const res = await fetch("/api/trades/get-holdings");

    if (!res.ok) {
      console.log("API error", res.status);
      setHoldings([]);
      return;
    }

    const data = await res.json().catch(() => null);

    if (!data) {
      setHoldings([]);
      return;
    }

    setHoldings(data.holdings || []);
  } catch (err) {
    console.log("Portfolio fetch error:", err);
    setHoldings([]);
  }
};

useEffect(() => {
  async function load() {
    try {
      const res = await fetch("/api/trades/get-holdings");
      const data = await res.json();

      setHoldings(data.holdings || []);
    } catch (err) {
      console.log("PORTFOLIO ERROR:", err);
    }
  }

  load();
}, []);


  const handleExitClick = (h) => {
    setSelected(h);
    setModalOpen(true);
  };

  const onDone = (completed) => {
    setModalOpen(false);
    setSelected(null);
    // reload holdings
    load();
    // optional: toast success
  };

  return (
    <>
      <NavBar />
      <div className="max-w-6xl mx-auto p-6 pt-28">
        <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

        {holdings.length === 0 ? (
          <p>No current holdings.</p>
        ) : (
          <div className="grid gap-4">
            {holdings.map((h) => (
              <div key={h._id} className="p-4 bg-white dark:bg-[#0b1220] rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-semibold">{h.asset}</div>
                  <div className="text-sm text-gray-500">Qty: {h.quantity} • Avg: {h.buyPrice}</div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleExitClick(h)} className="px-3 py-2 bg-red-600 text-white rounded">Exit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <ExitModal
          open={modalOpen}
          holding={selected}
          onClose={() => setModalOpen(false)}
          onDone={onDone}
        />
      )}
    </>
  );
}
