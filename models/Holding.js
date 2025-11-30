// models/Holding.js
import mongoose from "mongoose";

const HoldingSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  asset: { type: String, required: true },
  quantity: { type: Number, required: true },
  tradeType: { type: String, enum: ["CALL", "PUT", "N/A"], default: "N/A" },
  buyPrice: { type: Number, required: true },
  buyDate: { type: Date, required: true },
  targetPrice: { type: Number, default: null },
  summary: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Holding || mongoose.model("Holding", HoldingSchema);
