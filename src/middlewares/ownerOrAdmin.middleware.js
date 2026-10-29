import { EventModel } from "../models/event.model.js";

export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Evento no encontrado" });

    if (event.organizer !== req.user.id || req.user?.role !== "admin")
      return res
        .status(403)
        .json({ msg: "No tienes permisos para acceder a este evento" });

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
