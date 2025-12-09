"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [{ type: mongoose_1.Types.ObjectId, ref: "CartItem" }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Cart", CartSchema);
//# sourceMappingURL=Cart.js.map