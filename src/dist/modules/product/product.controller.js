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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.declineProduct = exports.approveProduct = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const product_1 = __importDefault(require("../../models/product"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageUrl = null;
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: "products",
            });
            imageUrl = result.secure_url;
            fs_1.default.unlinkSync(req.file.path);
        }
        const _a = req.body, { status } = _a, rest = __rest(_a, ["status"]);
        const product = new product_1.default(Object.assign(Object.assign(Object.assign({}, rest), (status && { status })), { image_url: imageUrl }));
        yield product.save();
        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.createProduct = createProduct;
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        return res.json(product);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageUrl;
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: "products",
            });
            imageUrl = result.secure_url;
            fs_1.default.unlinkSync(req.file.path);
        }
        const updatedData = Object.assign({}, req.body);
        if (imageUrl)
            updatedData.image_url = imageUrl;
        const product = yield product_1.default.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product updated successfully", product });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield product_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Product not found" });
        return res.json({ message: "Product deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.deleteProduct = deleteProduct;
// Approve a product by ID
const approveProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findByIdAndUpdate(id, { status: "available" }, { new: true });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product approved successfully", product });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.approveProduct = approveProduct;
// Decline a product by ID
const declineProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findByIdAndUpdate(id, { status: "discontinued" }, { new: true });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product declined successfully", product });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.declineProduct = declineProduct;
//# sourceMappingURL=product.controller.js.map