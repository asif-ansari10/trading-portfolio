import mongoose from "mongoose";

export const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("Missing MONGO_URI in .env");
  }

  await mongoose.connect(uri, {
    dbName: "trading-app"   // ✅ FORCE CORRECT DB!
  });

  console.log("Connected to DB: trading-app");
};
