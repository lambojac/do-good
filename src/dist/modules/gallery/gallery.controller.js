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
exports.deleteGalleryItem = exports.updateGalleryItem = exports.getGallery = exports.createGalleryItem = void 0;
const gallery_1 = __importDefault(require("../../models/gallery"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const createGalleryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }
        const uploadResult = yield cloudinary_1.default.uploader.upload(req.file.path, {
            folder: "gallery",
        });
        const item = yield gallery_1.default.create({
            title,
            category,
            imageUrl: uploadResult.secure_url,
        });
        return res.status(201).json(item);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.createGalleryItem = createGalleryItem;
const getGallery = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield gallery_1.default.find();
        return res.json(items);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getGallery = getGallery;
const updateGalleryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { title, category } = req.body;
        const item = yield gallery_1.default.findById(id);
        if (!item)
            return res.status(404).json({ error: "Gallery item not found" });
        if (req.file) {
            // Delete old image from Cloudinary
            const publicId = (_a = item.imageUrl.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
            if (publicId) {
                yield cloudinary_1.default.uploader.destroy(`gallery/${publicId}`);
            }
            // Upload new image
            const uploadResult = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: "gallery",
            });
            item.imageUrl = uploadResult.secure_url;
        }
        if (title)
            item.title = title;
        if (category)
            item.category = category;
        yield item.save();
        return res.json(item);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.updateGalleryItem = updateGalleryItem;
// Delete a gallery item
const deleteGalleryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const item = yield gallery_1.default.findById(id);
        if (!item)
            return res.status(404).json({ error: "Gallery item not found" });
        // Delete image from Cloudinary
        const publicId = (_a = item.imageUrl.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
        if (publicId) {
            yield cloudinary_1.default.uploader.destroy(`gallery/${publicId}`);
        }
        yield item.deleteOne();
        return res.json({ message: "Gallery item deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.deleteGalleryItem = deleteGalleryItem;
//# sourceMappingURL=gallery.controller.js.map