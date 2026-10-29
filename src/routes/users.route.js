import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { createUserValidation } from "../middlewares/validations/user.validation.js";

export const userRouter = Router();

userRouter.post("/users", createUserValidation, validate);
