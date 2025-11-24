import { Request, Response } from "express";
import Product from "../../models/product";
import cloudinary from "../../config/cloudinary";
import fs from "fs";

export const createProduct = async (req: Request, res: Response) => {
  try {
    let imageUrl: string | null = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });

      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const product = new Product({
      ...req.body,
      image_url: imageUrl,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.json(product);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const imageUrl = req.file ? (req.file as any).path : undefined;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(imageUrl && { image_url: imageUrl }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Product not found" });

    return res.json({
      message: "Product updated successfully",
      updated,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Product not found" });

    return res.json({ message: "Product deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
