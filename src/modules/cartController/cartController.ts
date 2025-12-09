import { Request, Response } from "express";
import Cart from "../../models/Cart";
import CartItem from "../../models/CartItem";
import Product from "../../models/product";
import User from "../../models/user";
import asynchandler from "express-async-handler";

/**
 * GET /api/cart/:userId
 */
export const getUserCart = asynchandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const userExists = await User.findById(userId);
  if (!userExists) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const cart = await Cart.findOne({ user_id: userId }).populate({
    path: "items",
    populate: { path: "product" }
  });

  if (!cart) {
    res.status(404).json({ message: "Cart not found" });
    return;
  }

  const items = cart.items.map((item: any) => {
    const subtotal = item.quantity * item.product.price;
    return {
      cart_item_id: item._id,
      product_id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      image_url: item.product.image_url,
      quantity: item.quantity,
      stock: item.product.stock,
      subtotal
    };
  });

  const subtotal = items.reduce((sum, x) => sum + x.subtotal, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  res.status(200).json({
    user_id: userId,
    items,
    subtotal,
    tax,
    total
  });
});

/**
 * POST /api/cart/add
 */
export const addToCart = asynchandler(async (req: Request, res: Response) => {
  const { user_id, product_id, quantity } = req.body;

  const user = await User.findById(user_id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const product = await Product.findById(product_id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  let cart = await Cart.findOne({ user_id });
  if (!cart) {
    cart = await Cart.create({ user_id, items: [] });
  }

  let cartItem = await CartItem.findOne({
    cart: cart._id,
    product: product_id
  });

  if (cartItem) {
    cartItem.quantity += Number(quantity);
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({
      cart: cart._id,
      product: product_id,
      quantity
    });

    cart.items.push(cartItem._id);
    await cart.save();
  }

  const populatedCart = await Cart.findById(cart._id).populate({
    path: "items",
    populate: { path: "product" }
  });

  if (!populatedCart) {
    res.status(404).json({ message: "Cart not found" });
    return;
  }

  const items = populatedCart.items;
  const total = items.reduce(
    (sum: number, item: any) => sum + item.quantity * item.product.price,
    0
  );

  res.status(200).json({
    success: true,
    message: "Item added to cart",
    cart: {
      items_count: items.length,
      total
    }
  });
});
