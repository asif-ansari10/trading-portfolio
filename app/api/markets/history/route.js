import yahooFinance from "yahoo-finance2";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");

    const chart = await yahooFinance.chart(symbol, {
      range: "3mo",
      interval: "1d",
    });

    return Response.json(
      chart.quotes.map((c) => ({
        time: Math.floor(new Date(c.date).getTime() / 1000),
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }))
    );
  } catch {
    return Response.json([]);
  }
}
