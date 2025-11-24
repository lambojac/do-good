"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Utility to generate JWT
const genToken = (userId) => {
    const secretKey = process.env.JWT_SECRET; // Access the secret from environment variables
    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jsonwebtoken_1.default.sign({ userId }, secretKey, { expiresIn: '1d' }); // Example with 1 day expiration
};
exports.default = genToken;
//# sourceMappingURL=genToken.js.map