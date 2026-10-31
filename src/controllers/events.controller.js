import { matchedData } from "express-validator";
import { EventModel } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const eventData = matchedData(req, { locations: ["body"] });

    const event = await EventModel.create({
      ...eventData,
      organizer: req.user._id,
    });

    return res.status(201).json({
      message: "Evento creado exitosamente",
      event,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find()
      .populate("organizer", "username email")
      .populate("categories");

    return res.status(200).json({
      message: "Listado de eventos obtenido exitosamente",
      events,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const getAllMyEvents = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const events = await EventModel.find({ organizer: req.user.id })
      .populate("organizer", "username email")
      .populate("categories");

    return res.status(200).json({
      message: "Listado de mis eventos",
      events,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const event = await EventModel.findById(id)
      .populate("organizer", "username email")
      .populate("categories");

    return res.status(200).json({
      message: "Evento y categoria obtenido exitosamente",
      event,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const { eventData } = matchedData(req, { locations: ["body"] });

    const event = await EventModel.findByIdAndUpdate(
      { _id: id },
      { $set: eventData },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      message: "Evento actualizado correctamente",
      event,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    await EventModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Evento eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};
