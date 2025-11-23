import express from "express";
import upload from "../middleware/upload";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product"
const router = express.Router();

router.post("/", upload.single("image"), createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
