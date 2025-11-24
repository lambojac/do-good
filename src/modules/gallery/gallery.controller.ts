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
