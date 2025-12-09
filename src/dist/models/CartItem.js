"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartItemSchema = new mongoose_1.Schema({
    cart: { type: mongoose_1.Types.ObjectId, ref: "Cart", required: true },
    product: { type: mongoose_1.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, min: 1 }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("CartItem", CartItemSchema);
//# sourceMappingURL=CartItem.js.map