import { Request, Response } from "express";
import SellerAccount from "../../models/seller";
import User from "../../models/user";

export const createSellerAccount = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingSeller = await SellerAccount.findOne({ userId });
    if (existingSeller) {
      return res.status(400).json({ message: "Seller account already exists", seller: existingSeller });
    }

    user.role = "vendor";
    await user.save();

    const seller = new SellerAccount({
      userId,
      fullName: user.fullName,
      email: user.email,
    });

    await seller.save();
    await seller.populate("userId", "fullName email role");

  
    res.status(201).json({
      message: "Seller account created successfully",
      seller,
      updatedUser: user, 
    });
    
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Get all sellers
// Get all sellers
export const getSellers = async (req: Request, res: Response) => {
  try {
    const sellers = await SellerAccount.find().populate("userId", "-password");
    res.status(200).json({ sellers });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get seller by ID
export const getSeller = async (req: Request, res: Response) => {
  try {
    const seller = await SellerAccount.findById(req.params.id).populate("userId", "-password");
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.status(200).json({ seller });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Update seller
export const updateSeller = async (req: Request, res: Response) => {
  try {
    const seller = await SellerAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.status(200).json({ message: "Seller updated", seller });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Delete seller
export const deleteSeller = async (req: Request, res: Response) => {
  try {
    const seller = await SellerAccount.findByIdAndDelete(req.params.id);
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.status(200).json({ message: "Seller deleted" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
