"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.getUserCart = void 0;
const Cart_1 = __importDefault(require("../../models/Cart"));
const CartItem_1 = __importDefault(require("../../models/CartItem"));
const product_1 = __importDefault(require("../../models/product"));
const user_1 = __importDefault(require("../../models/user"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * GET /api/cart/:userId
 */
exports.getUserCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const userExists = yield user_1.default.findById(userId);
    if (!userExists) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const cart = yield Cart_1.default.findOne({ user_id: userId }).populate({
        path: "items",
        populate: { path: "product" }
    });
    if (!cart) {
        res.status(404).json({ message: "Cart not found" });
        return;
    }
    const items = cart.items.map((item) => {
        const subtotal = item.quantity * item.product.price;
        return {
            cart_item_id: item._id,
            product_id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image_url: item.product.image_url,
            quantity: item.quantity,
            stock: item.product.stock,
            subtotal
        };
    });
    const subtotal = items.reduce((sum, x) => sum + x.subtotal, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    res.status(200).json({
        user_id: userId,
        items,
        subtotal,
        tax,
        total
    });
}));
/**
 * POST /api/cart/add
 */
exports.addToCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, product_id, quantity } = req.body;
    const user = yield user_1.default.findById(user_id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const product = yield product_1.default.findById(product_id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    let cart = yield Cart_1.default.findOne({ user_id });
    if (!cart) {
        cart = yield Cart_1.default.create({ user_id, items: [] });
    }
    let cartItem = yield CartItem_1.default.findOne({
        cart: cart._id,
        product: product_id
    });
    if (cartItem) {
        cartItem.quantity += Number(quantity);
        yield cartItem.save();
    }
    else {
        cartItem = yield CartItem_1.default.create({
            cart: cart._id,
            product: product_id,
            quantity
        });
        cart.items.push(cartItem._id);
        yield cart.save();
    }
    const populatedCart = yield Cart_1.default.findById(cart._id).populate({
        path: "items",
        populate: { path: "product" }
    });
    if (!populatedCart) {
        res.status(404).json({ message: "Cart not found" });
        return;
    }
    const items = populatedCart.items;
    const total = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    res.status(200).json({
        success: true,
        message: "Item added to cart",
        cart: {
            items_count: items.length,
            total
        }
    });
}));
//# sourceMappingURL=cartController.js.map