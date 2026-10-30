import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  createUserValidation,
  updateUserValidation,
  validateUserId,
} from "../middlewares/validations/user.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post(
  "/users",
  authMiddleware,
  adminMiddleware,
  createUserValidation,
  validate,
  insertUser,
);

userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);

userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  validateUserId,
  validate,
  getUserById,
);

userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidation,
  validate,
  updateUser,
);

userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  validateUserId,
  validate,
  deleteUser,
);
