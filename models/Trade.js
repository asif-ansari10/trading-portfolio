import mongoose from "mongoose";

const TradeSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  asset: { type: String, required: true },
  type: { type: String, enum: ["BUY", "SELL"], required: true },
  quantity: { type: Number, required: true },
  buyPrice: { type: Number, required: true },
  sellPrice: { type: Number, required: false },
  date: { type: Date, required: true },   // <-- ADDED DATE FIELD
}, { timestamps: true });

export default mongoose.models.Trade || mongoose.model("Trade", TradeSchema);
