// models/CompletedTrade.js
import mongoose from "mongoose";

const CompletedTradeSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  asset: { type: String, required: true },
  quantity: { type: Number, required: true },
  buyPrice: { type: Number, required: true },
  buyDate: { type: Date, required: true },
  sellPrice: { type: Number, required: true },
  sellDate: { type: Date, required: true },
  profit: { type: Number, required: true },
  summary: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.CompletedTrade || mongoose.model("CompletedTrade", CompletedTradeSchema);
