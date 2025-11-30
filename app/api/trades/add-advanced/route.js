// app/api/trades/add-advanced/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/lib/db";
import Holding from "@/models/Holding";
import CompletedTrade from "@/models/CompletedTrade";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDB();

    

    const userId = session.user.email; 
    const body = await req.json();
    // const userId = session.user.id || session.user.email || session.user.name;

    // if category === COMPLETE => create CompletedTrade
    if (body.category === "COMPLETE") {
      if (!body.sellPrice || !body.sellDate || !body.buyPrice || !body.buyDate) {
        return NextResponse.json({ error: "Missing trade fields" }, { status: 400 });
      }

      const profit = (Number(body.sellPrice) - Number(body.buyPrice)) * Number(body.qty || 1);

      const ct = await CompletedTrade.create({
        userId,
        asset: body.asset,
        quantity: Number(body.qty || 1),
        buyPrice: Number(body.buyPrice),
        buyDate: new Date(body.buyDate),
        sellPrice: Number(body.sellPrice),
        sellDate: new Date(body.sellDate),
        profit,
        summary: body.summary || ""
      });

      return NextResponse.json({ success: true, trade: ct });
    }

    // else create holding
    const holding = await Holding.create({
      userId,
      asset: body.asset,
      quantity: Number(body.qty || 1),
      tradeType: body.tradeType || "N/A",
      buyPrice: Number(body.buyPrice || 0),
      buyDate: body.buyDate ? new Date(body.buyDate) : new Date(),
      targetPrice: body.targetPrice ? Number(body.targetPrice) : null,
      summary: body.summary || ""
    });

    return NextResponse.json({ success: true, holding });
  } catch (err) {
    console.error("add-advanced error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
