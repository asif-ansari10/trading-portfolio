import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import {connectToDB} from "@/lib/db";
import Holding from "@/models/Holding";

export async function GET() {
  try {
    await connectToDB();

    const session = await getServerSession(auth);

    console.log("SESSION DATA:", session);  // 🔥 CHECK THIS

    if (!session) return NextResponse.json({ holdings: [] });

    const email = session.user.email;

    console.log("Querying holdings for:", email); // 🔥 CHECK THIS

    const holdings = await Holding.find({ userId: email });

    return NextResponse.json({ holdings });
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error", details: error.message },
      { status: 500 }
    );
  }
}
