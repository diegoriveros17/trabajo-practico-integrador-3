import { body, param } from "express-validator";
import { CategoryModel } from "../../models/category.model.js";
import { applyOptional } from "../../helpers/validations.helper.js";

export const validateCategoryId = [
  param("id")
    .notEmpty()
    .withMessage("El id del categoria es obligatorio")
    .bail()
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .bail()
    .custom(async (id) => {
      const category = await CategoryModel.findById(id);
      if (!category) throw new Error("La categoria especificada no existe");
    }),
];

const categoryRules = (esActualizacion = false) =>
  applyOptional(
    [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la categoria es obligatorio")
        .bail()
        .isLength({ min: 2, max: 30 })
        .withMessage(
          "El nombre de la categoria debe tener entre 2 y 30 caracteres",
        )
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
    ],
    esActualizacion,
  );

export const createCategoryValidation = categoryRules(false);
export const updateCategoryValidation = [
  ...validateCategoryId,
  ...categoryRules(true),
];
