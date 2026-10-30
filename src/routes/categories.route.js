import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categories.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
  validateCategoryId,
} from "../middlewares/validations/categories.validation.js";

export const categoriesRouter = Router();

categoriesRouter.post(
  "/categories",
  authMiddleware,
  adminMiddleware,
  createCategoryValidation,
  validate,
  createCategory,
);

categoriesRouter.get(
  "/categories",
  authMiddleware,
  adminMiddleware,
  getAllCategories,
);

categoriesRouter.get(
  "/categories/:id",
  authMiddleware,
  validateCategoryId,
  validate,
  getCategoryById,
);

categoriesRouter.put(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  updateCategoryValidation,
  validate,
  updateCategory,
);

categoriesRouter.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  validateCategoryId,
  validate,
  deleteCategory,
);
