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
import {
  createEventValidation,
  updateEventValidation,
  validateEventId,
} from "../middlewares/validations/events.validation.js";
import { ownerOrAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";

export const eventRouter = Router();

eventRouter.post(
  "/events",
  authMiddleware,
  createEventValidation,
  validate,
  createEvent,
);

eventRouter.get("/events", authMiddleware, getAllEvents);

eventRouter.get("/myEvents", authMiddleware, getAllMyEvents);

eventRouter.get(
  "/events/:id",
  authMiddleware,
  validateEventId,
  validate,
  getEventById,
);

eventRouter.put(
  "/events/:id",
  authMiddleware,
  updateEventValidation,
  validate,
  updateEvent,
);

eventRouter.delete(
  "/events/:id",
  authMiddleware,
  validateEventId,
  validate,
  ownerOrAdminMiddleware,
  deleteEvent,
);
