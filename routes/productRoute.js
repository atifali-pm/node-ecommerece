import express from "express";

import { create, getProducts, getSingleProduct, productFilter } from "../controllers/productController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/product", requireSignIn, create);
router.get("/products", getProducts);
router.get("/product/:slug", getSingleProduct);
router.post("/products/filter", productFilter);

export default router;