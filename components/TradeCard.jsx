export default function TradeCard({ trade }) {
  const profit = trade.profit ?? null;
  const isProfit = profit !== null && profit > 0;

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-[#111827] shadow-sm">
      <h2 className="font-bold text-xl">{trade.asset}</h2>

      <p>Type: {trade.tradeType || trade.type}</p>
      <p>Qty: {trade.quantity}</p>
      <p>Buy: {trade.buyPrice}</p>

      {trade.sellPrice && <p>Sell: {trade.sellPrice}</p>}

      {/* PROFIT FIXED */}
      <p
        className={`text-lg font-bold ${
          isProfit ? "text-green-600" : "text-red-600"
        }`}
      >
        {profit !== null ? `₹${profit.toFixed(2)}` : "No P/L yet"}
      </p>
    </div>
  );
}
