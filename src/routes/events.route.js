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
  "/",
  authMiddleware,
  createEventValidation,
  validate,
  createEvent,
);

eventRouter.get("/", authMiddleware, getAllEvents);

eventRouter.get("/my", authMiddleware, getAllMyEvents);

eventRouter.get(
  "/:id",
  authMiddleware,
  validateEventId,
  validate,
  getEventById,
);

eventRouter.put(
  "/:id",
  authMiddleware,
  updateEventValidation,
  validate,
  updateEvent,
);

eventRouter.delete(
  "/:id",
  authMiddleware,
  validateEventId,
  validate,
  ownerOrAdminMiddleware,
  deleteEvent,
);
