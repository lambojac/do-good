import { Request, Response } from "express";
import Blog from "../../models/blog";
import cloudinary from "../../config/cloudinary";

// CREATE BLOG
export const createBlog = async (req: Request, res: Response) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const img = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_images",
      });
      imageUrl = img.secure_url;
    }

    const blog = new Blog({
      ...req.body,
      image: imageUrl,
      views: 0,
      date: new Date().toISOString(),
    });

    const savedBlog = await blog.save();

    return res.status(201).json(savedBlog);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

//
export const getAllBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();

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
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
//
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
//
export const updateBlog = async (req: Request, res: Response) => {
  try {
    let updatedData = req.body;

    if (req.file) {
      const img = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_images",
      });

      updatedData.image = img.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(updatedBlog);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
//
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
