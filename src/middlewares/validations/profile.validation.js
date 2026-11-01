import { body } from "express-validator";

export const ProfileValidation = [
  body("profile.first_name")
    .trim()
    .notEmpty()
    .withMessage("El campo nombre no estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras"),
  body("profile.last_name")
    .trim()
    .notEmpty()
    .withMessage("El campo nombre no estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo puede contener letras"),
  body("profile.birthDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe tener el formato YYYY-MM-DD")
    .custom((birthDate) => {
      if (new Date(birthDate) > new Date()) {
        throw new Error("La fecha de nacimiento no mayor a la actual");
      }
      return true;
    }),
  body("profile.phone")
    .optional()
    .matches(/^\d{8,15}$/)
    .withMessage("El teléfono debe tener solo números (entre 8 y 15 dígitos)"),
];
