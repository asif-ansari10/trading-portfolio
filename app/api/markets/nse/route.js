import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://www.nseindia.com/api/allIndices", {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    const data = await res.json();

    // CLEAN KEYS (remove spaces + invisible UTF chars)
    const cleaned = data.data.map((i) => ({
      ...i,
      index: i.index.replace(/\uFFFD/g, "").trim().toUpperCase(),
    }));

    return NextResponse.json({ data: cleaned });

  } catch (e) {
    console.log("NSE ERROR →", e);
    return NextResponse.json({ data: [] });
  }
}
