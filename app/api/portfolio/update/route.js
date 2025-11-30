import { connectDB } from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { verifyToken } from "@/utils/verifyToken";

export async function POST(req) {
  await connectDB();

  const user = verifyToken(req);
  if (!user) return Response.json({ error: "Unauthorized" });

  const { asset, avgBuyPrice, quantity, currentPrice } = await req.json();

  const holding = await Portfolio.findOneAndUpdate(
    { userId: user.id, asset },
    { avgBuyPrice, quantity, currentPrice },
    { upsert: true, new: true }
  );

  return Response.json({ message: "Portfolio updated", holding });
}
