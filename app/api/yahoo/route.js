import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const price = data.chart.result[0].meta.regularMarketPrice;

    return NextResponse.json({ price });
  } catch (err) {
    return NextResponse.json({ price: null });
  }
}
