import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  title: string;
  category: "Products" | "Store";
  imageUrl: string;
}

const GallerySchema = new Schema<IGallery>({
  title: { type: String, required: true },
  category: { type: String, enum: ["Products", "Store"], required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.model<IGallery>("Gallery", GallerySchema);
