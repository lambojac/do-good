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
exports.deleteSeller = exports.updateSeller = exports.getSeller = exports.getSellers = exports.createSellerAccount = void 0;
const seller_1 = __importDefault(require("../../models/seller"));
const user_1 = __importDefault(require("../../models/user"));
const createSellerAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        // Get user first
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Create seller account and copy data from User
        const seller = new seller_1.default({
            userId,
            fullName: user.fullName,
            email: user.email,
        });
        yield seller.save();
        // Populate for response only (not needed for saving)
        yield seller.populate("userId", "fullName email");
        res.status(201).json({
            message: "Seller account created successfully",
            seller,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.createSellerAccount = createSellerAccount;
// Get all sellers
const getSellers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellers = yield seller_1.default.find();
        res.status(200).json({ sellers });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.getSellers = getSellers;
// Get seller by ID
const getSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seller = yield seller_1.default.findById(req.params.id);
        if (!seller)
            return res.status(404).json({ message: "Seller not found" });
        res.status(200).json({ seller });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.getSeller = getSeller;
// Update seller
const updateSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seller = yield seller_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!seller)
            return res.status(404).json({ message: "Seller not found" });
        res.status(200).json({ message: "Seller updated", seller });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.updateSeller = updateSeller;
// Delete seller
const deleteSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seller = yield seller_1.default.findByIdAndDelete(req.params.id);
        if (!seller)
            return res.status(404).json({ message: "Seller not found" });
        res.status(200).json({ message: "Seller deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.deleteSeller = deleteSeller;
//# sourceMappingURL=seller.controller.js.map