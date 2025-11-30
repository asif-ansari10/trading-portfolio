import { connectToDB } from "@/lib/db";
import Holding from "@/models/Holding";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  await connectToDB();

  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" });

  const { asset, quantity, buyPrice, buyDate, tradeType, summary } = await req.json();

  const holding = await Holding.findOneAndUpdate(
    { userId: session.user.id, asset },
    { quantity, buyPrice, buyDate, tradeType, summary },
    { upsert: true, new: true }
  );

  return Response.json({ message: "Holding updated", holding });
}
