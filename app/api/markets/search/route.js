import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) return NextResponse.json([]);

    const url = `https://query2.finance.yahoo.com/v1/finance/search?q=${query}`;
    const res = await fetch(url);
    const data = await res.json();

    const results =
      data.quotes?.map((q) => ({
        symbol: q.symbol,
        shortname: q.shortname || q.longname || "",
      })) || [];

    return NextResponse.json(results);
  } catch (err) {
    console.error("Search API Error:", err);
    return NextResponse.json([]);
  }
}
