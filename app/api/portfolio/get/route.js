import { NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import connectToDB from "@/lib/db";
import Holding from "@/models/Holding";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();

  const holdings = await Holding.find({ userEmail: session.user.email });

  return NextResponse.json({ holdings });
}
