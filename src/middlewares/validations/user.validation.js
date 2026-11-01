import { param, body } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { ProfileValidation } from "./profile.validation.js";
import { applyOptional } from "../../helpers/validations.helper.js";

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

const userRules = (esActualizacion = false) =>
  applyOptional(
    [
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

      ...ProfileValidation,
    ],
    esActualizacion,
  );

export const createUserValidation = userRules(false);
export const updateUserValidation = [...validateUserId, ...userRules(true)];
