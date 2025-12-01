import mongoose, { Schema } from "mongoose";
import User from "./user"; 

const sellerAccountSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName:{
    type: String,
  },
  email: {
    type: String,
  },
  sales_volume: {
    type: Number,
    default: 0,
  },
  return_rate: {
    type: Number,
    default: 0.0,
  },
  customer_feedback_score: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("SellerAccount", sellerAccountSchema);
