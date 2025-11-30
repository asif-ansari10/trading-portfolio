import { connectToDB } from "@/lib/db";
import Holding from "@/models/Holding";
import CompletedTrade from "@/models/CompletedTrade";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ trades: [], completed: [] });
    }

    console.log("Fetching trades for:", session.user.email);

    await connectToDB();

    const holdings = await Holding.find({
      userId: session.user.email,
    });

    const completed = await CompletedTrade.find({
      userId: session.user.email,
    });

    return Response.json({
      holdings,
      completed,
    });

  } catch (error) {
    console.log("GET-TRADES ERROR:", error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
