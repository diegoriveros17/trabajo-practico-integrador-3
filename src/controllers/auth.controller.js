import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const login = async (req, res) => {
  try {
    const { username, password } = matchedData(req, { locations: ["body"] });

    const userExist = await UserModel.findOne({ username, deletedAt: null });

    if (!userExist) {
      return res
        .status(401)
        .json({ message: "Usuario o contreña incorrectos" });
    }

    //comprobar si la contraseña que ingresa el usuario coincide con la de la bd
    const validPassword = await comparePassword(password, userExist.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Usuario o contreña incorrectos" });
    }

    const token = await generateToken({
      id: userExist.id,
      role: userExist.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return res
      .status(200)
      .json({ message: `Bienvenido, ${userExist.username}`, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error interno del servidor ${error} ` });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, profile } = matchedData(req, {
      locations: ["body"],
    });

    const passwordHashed = await hashPassword(password);

    const userExist = await UserModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (userExist) {
      return res.status(409).json({
        message: `El nombre de usuario o email ya se encuentra en uso`,
      });
    }

    await UserModel.create({
      username,
      email,
      password: passwordHashed,
      profile,
    });

    return res
      .status(201)
      .json({ message: `Usuario registrado correctamente` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error interno del servidor ${error}` });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token"); //Eliminar cookie
  return res.json({ message: `Has cerrado sesion` });
};

export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("profile -_id");

    return res.status(200).json({
      message: "Perfil obtenido",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profile } = matchedData(req, { locations: ["body"] });

    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $set: { profile } },
      { returnDocument: "after", runValidators: true },
    );

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error.message}`,
    });
  }
};
