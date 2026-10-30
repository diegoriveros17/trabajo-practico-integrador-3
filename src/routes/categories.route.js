import { Router } from "express";
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/articles_tags.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categories.controller.js";

export const categoriesRouter = Router();

categoriesRouter.post("/categories", validate, createCategory);

categoriesRouter.get("/categories", getAllCategories);

categoriesRouter.get("/categories/:id", validate, getCategoryById);

categoriesRouter.put("/categories/:id", validate, updateCategory);

categoriesRouter.delete("/categories/:id", validate, deleteCategory);
