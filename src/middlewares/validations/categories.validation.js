import { body, param } from "express-validator";
import { CategoryModel } from "../../models/category.model.js";

export const validateCategoryId = [
  param("id")
    .notEmpty()
    .withMessage("El id del categoria es obligatorio")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (id) => {
      const category = await CategoryModel.findById(id);
      if (!category) {
        throw new Error("La categoria especificada no existe");
      }
      return true;
    }),
];

export const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la categoria es obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de la categoria debe tener entre 2 y 30 caracteres")
    .bail()
    .custom(async (name) => {
      const nameCategory = await CategoryModel.findOne({ name });
      if (nameCategory) {
        throw new Error("Ya existe una categoria con este nombre");
      }
      return true;
    }),
  body("description")
    .trim()
    .isLength({ max: 200 })
    .withMessage("La descripcion no puede exceder los 200 caracteres"),
];

export const updateCategoryValidation = [
  validateCategoryId,
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de la categoria debe tener entre 2 y 30 caracteres")
    .bail()
    .custom(async (name) => {
      const nameCategory = await CategoryModel.findOne({ name });
      if (nameCategory) {
        throw new Error("Ya existe una categoria con este nombre");
      }
      return true;
    }),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La descripcion no puede exceder los 200 caracteres"),
];

// Category-Tag
export const validateCategoryEventId = [
  validateCategoryId,
  param("event_id")
    .notEmpty()
    .withMessage("El id de la etiqueta es obligatorio")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (event_id) => {
      const tag = await Event.findById(event_id);
      if (!tag) {
        throw new Error("La etiqueta especificada no existe");
      }
      return true;
    }),
];
