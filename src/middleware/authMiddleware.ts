import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

interface JWTDecoded {
  userId: string;
}

// Middleware to check authentication and admin role
const Secure = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401);
        throw new Error("Not authorized, token missing or invalid");
      }

      const token = authHeader.split(" ")[1];

      const verified = jwt.verify(token, process.env.JWT_SECRET as string, {
        algorithms: ["HS256"],
      }) as JWTDecoded;

      const user = await User.findById(verified.userId).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      // Check if the user is an admin
      if (user.role !== "admin") {
        res.status(403);
        throw new Error("Access denied, admin only");
      }

      // Attach user to request object
      (req as any).user = user;

      next();
    } catch (error: any) {
      res.status(error.status || 401).json({ message: error.message || "Not authorized" });
    }
  }
);

export default Secure;
