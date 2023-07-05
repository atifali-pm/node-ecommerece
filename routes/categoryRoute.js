import express from "express";
import { requireSignIn } from "../middleware/authMiddleware.js";
import  {create}  from "../controllers/categoryController.js";

const router = express.Router();

router.post("/category", requireSignIn, create)

export default router;