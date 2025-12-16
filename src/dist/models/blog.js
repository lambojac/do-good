"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
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
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
exports.default = mongoose_1.default.model("Blog", BlogSchema);
//# sourceMappingURL=blog.js.map