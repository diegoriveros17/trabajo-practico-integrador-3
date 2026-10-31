import { param, body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const loginUserValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El usuario es obligatori")
    .bail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
];

export const validateUserId = [
  param("id")
    .notEmpty()
    .withMessage("El id es obligatorio")
    .isMongoId()
    .withMessage("El id no tiene el formato correcto")
    .custom(async (id) => {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),
];

export const createUserValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .bail()
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage(
      "El nombre de usuario solo puede contener caracteres alfanuméricos",
    )
    .bail()
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
      if (user) {
        throw new Error("El nombre de usuario ya se encuentra en uso");
      }
      return true;
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .bail()
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("El correo electrónico ya se encuentra registrado");
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .withMessage(
      "La contraseña debe tener mínimo 8 caracteres y contener al menos una mayúscula, una minúscula y un número",
    ),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol solo puede ser 'user' o 'admin'"),
  body("profile.first_name")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras"),
  body("profile.last_name")
    .trim()
    .notEmpty()
    .withMessage("El apellido no puede estar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo puede contener letras"),
  body("profile.birthDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe tener el formato YYYY-MM-DD")
    .bail()
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
  ,
];

export const updateUserValidation = [
  ...validateUserId,
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .bail()
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage(
      "El nombre de usuario solo puede contener caracteres alfanuméricos",
    )
    .bail()
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
      if (user) {
        throw new Error("El nombre de usuario ya se encuentra en uso");
      }
      return true;
    }),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .bail()
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("El correo electrónico ya se encuentra registrado");
      }
      return true;
    }),
  body("password")
    .optional()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .withMessage(
      "La contraseña debe tener mínimo 8 caracteres y contener al menos una mayúscula, una minúscula y un número",
    ),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol solo puede ser 'user' o 'admin'"),
];
