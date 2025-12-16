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
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// Middleware to check authentication and admin role
const Secure = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401);
            throw new Error("Not authorized, token missing or invalid");
        }
        const token = authHeader.split(" ")[1];
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
        });
        const user = yield user_1.default.findById(verified.userId).select("-password");
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }
        // Check if the user is an admin
        if (user.role !== "admin") {
            res.status(403);
            throw new Error("Access denied, admin only");
        }
        // Attach user to request object
        req.user = user;
        next();
    }
    catch (error) {
        res.status(error.status || 401).json({ message: error.message || "Not authorized" });
    }
}));
exports.default = Secure;
//# sourceMappingURL=authMiddleware.js.map