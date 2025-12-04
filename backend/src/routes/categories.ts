import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";

const router = Router();

// Get all categories
router.get("/", getAllCategories);

// Get category by ID
router.get("/:id", getCategoryById);

// Update category
router.put("/:id", updateCategory);

export default router;
