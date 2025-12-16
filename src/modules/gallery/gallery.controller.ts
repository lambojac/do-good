import { Request, Response } from "express";
import Gallery from "../../models/gallery";
import cloudinary from "../../config/cloudinary";

export const createGalleryItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "gallery",
    });

    const item = await Gallery.create({
      title,
      category,
      imageUrl: uploadResult.secure_url,
    });

    return res.status(201).json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getGallery = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const items = await Gallery.find();
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ error });
  }
};


export const updateGalleryItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, category } = req.body;

    
    const item = await Gallery.findById(id);
    if (!item) return res.status(404).json({ error: "Gallery item not found" });

    if (req.file) {
      // Delete old image from Cloudinary
      const publicId = item.imageUrl.split("/").pop()?.split(".")[0]; 
      if (publicId) {
        await cloudinary.uploader.destroy(`gallery/${publicId}`);
      }

      // Upload new image
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "gallery",
      });
      item.imageUrl = uploadResult.secure_url;
    }

    if (title) item.title = title;
    if (category) item.category = category;

    await item.save();
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// Delete a gallery item
export const deleteGalleryItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const item = await Gallery.findById(id);
    if (!item) return res.status(404).json({ error: "Gallery item not found" });

    // Delete image from Cloudinary
    const publicId = item.imageUrl.split("/").pop()?.split(".")[0]; 
    if (publicId) {
      await cloudinary.uploader.destroy(`gallery/${publicId}`);
    }

    await item.deleteOne();
    return res.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};