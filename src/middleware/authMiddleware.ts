import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

interface JWTDecoded {
    userId: string;
}

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
            (req as any).user = user;
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, please login");
        }
    }
);

export default Secure;
