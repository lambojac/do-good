"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=product.js.map