export async function GET() {
  try {
    const res = await fetch("https://api.tickertape.in/markets/indices");
    const json = await res.json();
    return Response.json(json);
  } catch (err) {
    return Response.json({ error: "Failed to fetch indices" }, { status: 500 });
  }
}
