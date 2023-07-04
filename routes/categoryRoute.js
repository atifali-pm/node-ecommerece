import express from "express";
import { requireSignIn } from "../middleware/authMiddleware.js";
import  {createCategory}  from "../controllers/categoryController.js";

const router = express.Router();

router.post("/category", requireSignIn, createCategory)

export default router;