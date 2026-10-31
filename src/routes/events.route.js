import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getAllMyEvents,
  getEventById,
  updateEvent,
} from "../controllers/events.controller.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const eventRouter = Router();

eventRouter.get("/", authMiddleware, getAllEvents);

eventRouter.get("/my", authMiddleware, getAllMyEvents);

eventRouter.get("/:id", authMiddleware, validate, getEventById);

eventRouter.post("/", authMiddleware, validate, createEvent);

eventRouter.put("/:id", authMiddleware, validate, updateEvent);

eventRouter.delete("/:id", authMiddleware, validate, deleteEvent);
