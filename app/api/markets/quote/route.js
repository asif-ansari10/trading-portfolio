import { NextResponse } from "next/server";

const yahooMap = {
  "OANDA:XAUUSD": "XAUUSD=X",
  "OANDA:XAGUSD": "XAGUSD=X",
  "OANDA:WTICO_USD": "CL=F",
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let symbol = searchParams.get("symbol");

    if (!symbol) return NextResponse.json({});

    // Convert CFD symbol → Yahoo Finance symbol
    const yahooSymbol = yahooMap[symbol] || symbol;

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d`;

    const response = await fetch(url);
    const json = await response.json();

    const result = json?.chart?.result?.[0];
    if (!result) return NextResponse.json({});

    const meta = result.meta;

    return NextResponse.json({
      price: meta.regularMarketPrice ?? meta.previousClose ?? 0,
      high: meta.regularMarketDayHigh ?? meta.chartPreviousClose ?? 0,
      low: meta.regularMarketDayLow ?? meta.chartPreviousClose ?? 0,
      change: meta.regularMarketChange ?? 0,
      percent: meta.regularMarketChangePercent ?? 0,
    });

  } catch (err) {
    console.log("QUOTE API ERROR →", err);
    return NextResponse.json({});
  }
}
