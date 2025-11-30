// app/api/trades/exit-holding/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";   // ✅ FIXED
import {connectToDB} from "@/lib/db";
import Holding from "@/models/Holding";
import CompletedTrade from "@/models/CompletedTrade";


export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDB();
    const body = await req.json();
    const { holdingId, sellPrice, sellDate, summary } = body;

    if (!holdingId || !sellPrice || !sellDate) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const userId = session.user.id || session.user.email || session.user.name;
    const holding = await Holding.findOne({ _id: holdingId, userId });
    if (!holding) return NextResponse.json({ error: "Holding not found" }, { status: 404 });

    const qty = Number(holding.quantity || 1);
    const buyPrice = Number(holding.buyPrice || 0);
    const profit = (Number(sellPrice) - buyPrice) * qty;

    const completed = await CompletedTrade.create({
      userId,
      asset: holding.asset,
      quantity: qty,
      buyPrice,
      buyDate: holding.buyDate,
      sellPrice: Number(sellPrice),
      sellDate: new Date(sellDate),
      profit,
      summary: summary || holding.summary || ""
    });

    await Holding.deleteOne({ _id: holdingId });

    return NextResponse.json({ success: true, completed });
  } catch (err) {
    console.error("exit holding error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
