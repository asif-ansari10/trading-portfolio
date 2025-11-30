import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import  {connectToDB}  from "@/lib/db";
import Trade from "@/models/Trade";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session)
    return Response.json({ error: "Not authenticated" }, { status: 401 });

  await  connectToDB ();

  const body = await req.json();

  const trade = await Trade.create({
    userEmail: session.user.email,
    asset: body.asset,
    type: body.type,
    quantity: body.quantity,
    buyPrice: body.buyPrice,
    sellPrice: body.sellPrice,
    date: new Date(body.date),   // <--- save date
  });

  return Response.json({ message: "Trade added", trade });
}
