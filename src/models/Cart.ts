import { Schema, model, Types, Document } from "mongoose";

export interface CartDocument extends Document {
  user_id: Types.ObjectId;
  items: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<CartDocument>(
  {
    user_id: { type: Types.ObjectId, ref: "User", required: true, unique: true },
    items: [{ type: Types.ObjectId, ref: "CartItem" }]
  },
  { timestamps: true }
);

export default model<CartDocument>("Cart", CartSchema);
