import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {connectToDB} from "@/lib/db";
import CompletedTrade from "@/models/CompletedTrade";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ trades: [] }); // user not logged in
    }

    await connectToDB();

    const trades = await CompletedTrade.find({
      userId: session.user.email
    }).sort({ createdAt: -1 });

    return NextResponse.json({ trades });
  } catch (error) {
    console.error("GET TRADES API ERROR:", error);
    return NextResponse.json({ trades: [] });
  }
}
