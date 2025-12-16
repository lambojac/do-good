import mongoose, { Document } from "mongoose";

export interface BlogDocument extends Document {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  date: string;
  readTime: string;
  status: string;
  views: number;
  tags: string[];
  related_posts: string[];
  created_at: Date;
  updated_at: Date;
}

const BlogSchema = new mongoose.Schema<BlogDocument>(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    author: {
      name: String,
      avatar: String,
      bio: String,
    },
    date: String,
    readTime: String,
    status: { type: String, default: "published" },
    views: { type: Number, default: 0 },
    tags: [String],
    related_posts: [String],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model("Blog", BlogSchema);
