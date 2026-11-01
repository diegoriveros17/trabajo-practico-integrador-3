import { body, param } from "express-validator";
import { isValidObjectId } from "mongoose";
import { EventModel } from "../../models/event.model.js";
import { CategoryModel } from "../../models/category.model.js";
import { applyOptional } from "../../helpers/validations.helper.js";

export const validateEventId = [
  param("id")
    .notEmpty()
    .withMessage("El id del evento es obligatorio")
    .bail()
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (id) => {
      const user = await EventModel.findById(id);
      if (!user) {
        throw new Error("El evento especificado no existe");
      }
      return true;
    }),
];

// Validaciones que comparten crear y actualizar
const categoriesValidation = [
  body("categories")
    .optional()
    .isArray()
    .withMessage("Las categorías deben enviarse en un array")
    .bail()
    .custom(async (categories) => {
      if (!categories.every((id) => isValidObjectId(id))) return true;

      // Todas las categorías enviadas deben existir
      const found = await CategoryModel.find({ _id: { $in: categories } });
      if (found.length !== categories.length) {
        throw new Error("Alguna de las categorías enviadas no existe");
      }
      return true;
    }),

  body("categories.*")
    .isMongoId()
    .withMessage("Cada categoría debe ser un id válido"),
];

const endDateAfterStartDate = (endDate, { req }) => {
  // Solo se compara cuando se envían ambas fechas
  if (req.body.startDate && new Date(endDate) <= new Date(req.body.startDate)) {
    throw new Error("La fecha de fin debe ser posterior a la fecha de inicio");
  }
  return true;
};

const eventRules = (esActualizacion = false) =>
  applyOptional(
    [
      body("title")
        .trim()
        .notEmpty()
        .withMessage("El título es obligatorio")
        .bail()
        .isLength({ min: 3, max: 150 })
        .withMessage("El título debe tener entre 3 y 150 caracteres")
        .bail()
        .custom(async (title) => {
          const event = await EventModel.findOne({ title });
          if (event) {
            throw new Error("Ya existe un evento con este título");
          }
          return true;
        }),

      body("description")
        .trim()
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .bail()
        .isLength({ min: 20 })
        .withMessage("La descripción debe tener al menos 20 caracteres"),

      body("startDate")
        .notEmpty()
        .withMessage("La fecha de inicio es obligatoria")
        .bail()
        .isISO8601()
        .withMessage("La fecha de inicio no es válida"),

      body("endDate")
        .notEmpty()
        .withMessage("La fecha de fin es obligatoria")
        .bail()
        .isISO8601()
        .withMessage("La fecha de fin no es válida")
        .bail()
        .custom(endDateAfterStartDate),

      body("capacity")
        .notEmpty()
        .withMessage("La capacidad es obligatoria")
        .bail()
        .isInt({ min: 1 })
        .withMessage("La capacidad debe ser un entero mayor o igual a 1"),

      body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("El precio debe ser un número mayor o igual a 0"),

      body("status")
        .optional()
        .isIn(["scheduled", "cancelled", "finished"])
        .withMessage(
          "El estado debe ser 'scheduled', 'cancelled' o 'finished'",
        ),

      body("location.venue")
        .trim()
        .notEmpty()
        .withMessage("El lugar (venue) es obligatorio")
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage("El lugar debe tener entre 3 y 100 caracteres"),

      body("location.address")
        .trim()
        .notEmpty()
        .withMessage("La dirección es obligatoria")
        .bail()
        .isLength({ min: 5, max: 150 })
        .withMessage("La dirección debe tener entre 5 y 150 caracteres"),

      body("location.city")
        .trim()
        .notEmpty()
        .withMessage("La ciudad es obligatoria")
        .bail()
        .isLength({ min: 2, max: 50 })
        .withMessage("La ciudad debe tener entre 2 y 50 caracteres"),

      ...categoriesValidation,
    ],
    esActualizacion,
  );
export const createEventValidation = eventRules(false);
export const updateEventValidation = [...validateEventId, ...eventRules(true)];
