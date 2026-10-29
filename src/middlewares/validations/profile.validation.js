import { param, body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const loginUserValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username no puede ser vacio")
    .bail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La password no puede estar vacia"),
];

export const updateProfileValidation = [
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
  body("profile.first_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras"),
  body("profile.last_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo puede contener letras"),
  body("profile.birthDate")
    .optional()
    .isDate({ format: "DD-MM-YYYY", strictMode: true })
    .withMessage("La fecha debe tener el formato DD-MM-YYYY"),
  body("profile.phone").optional(),
];
