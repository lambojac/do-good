import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,

  price: {
    type: Number,
    required: true,
  },

  image_url: {
    type: String,
  },

  category: {
    type: String,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["available", "discontinued"],
    default: "out_of_stock",
  },
});

export default mongoose.model("Product", productSchema);
