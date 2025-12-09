import { Schema, model, Types, Document } from "mongoose";

export interface CartItemDocument extends Document {
  cart: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
}

const CartItemSchema = new Schema<CartItemDocument>(
  {
    cart: { type: Types.ObjectId, ref: "Cart", required: true },
    product: { type: Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, min: 1 }
  },
  { timestamps: true }
);

export default model<CartItemDocument>("CartItem", CartItemSchema);
