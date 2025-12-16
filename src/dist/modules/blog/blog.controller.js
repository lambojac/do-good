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
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const blog_1 = __importDefault(require("../../models/blog"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
// CREATE BLOG
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageUrl = "";
        if (req.file) {
            const img = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: "blog_images",
            });
            imageUrl = img.secure_url;
        }
        const blog = new blog_1.default(Object.assign(Object.assign({}, req.body), { image: imageUrl, views: 0, date: new Date().toISOString() }));
        const savedBlog = yield blog.save();
        return res.status(201).json(savedBlog);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createBlog = createBlog;
//
const getAllBlogs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.find();
        const formatted = blogs.map((blog) => ({
            _id: blog._id,
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            image: blog.image,
            category: blog.category,
            author: blog.author,
            date: blog.date,
            readTime: blog.readTime,
            status: blog.status,
            views: blog.views,
            created_at: blog.created_at,
            updated_at: blog.updated_at,
        }));
        return res.status(200).json(formatted);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllBlogs = getAllBlogs;
//
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_1.default.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json(blog);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getBlogById = getBlogById;
//
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updatedData = req.body;
        if (req.file) {
            const img = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: "blog_images",
            });
            updatedData.image = img.secure_url;
        }
        const updatedBlog = yield blog_1.default.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json(updatedBlog);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateBlog = updateBlog;
//
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBlog = yield blog_1.default.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteBlog = deleteBlog;
//# sourceMappingURL=blog.controller.js.map