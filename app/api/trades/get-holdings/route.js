import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {connectToDB} from "@/lib/db";
import Holding from "@/models/Holding";

export async function GET() {
  try {
    await connectToDB();

    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ holdings: [] });

    const email = session.user.email;

    const holdings = await Holding.find({ userEmail: email });

    return NextResponse.json({ holdings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}