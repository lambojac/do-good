import { Request, Response } from "express";
import SellerAccount from "../../models/seller";
import User from "../../models/user";

export const createSellerAccount = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    // Get user first
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create seller account and copy data from User
    const seller = new SellerAccount({
      userId,
      fullName: user.fullName,
      email: user.email,
    });

    await seller.save();

    // Populate for response only (not needed for saving)
    await seller.populate("userId", "fullName email");

    res.status(201).json({
      message: "Seller account created successfully",
      seller,
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Get all sellers
export const getSellers = async (req: Request, res: Response) => {
  try {
    const sellers = await SellerAccount.find();
    res.status(200).json({ sellers });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get seller by ID
export const getSeller = async (req: Request, res: Response) => {
  try {
    const seller = await SellerAccount.findById(req.params.id);
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
