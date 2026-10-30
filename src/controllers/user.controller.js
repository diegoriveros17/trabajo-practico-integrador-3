import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null })
      .select("-_id -password -createdAt -updatedAt -deletedAt")
      .populate("events");

    return res.status(200).json({
      message: "Listado de usuarios obtenido correctamente",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const user = await UserModel.findOne({ id, deletedAt: null })
      .select("-_id -password -createdAt -updatedAt -deletedAt")
      .populate("events");
    if (!user) {
      return res.status(404).json({
        message: "El usuario que intenta consultar no existe",
      });
    }

    return res.status(200).json({
      message: "Usuario obtenido correctamente",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor al obtener usuario: ${error}`,
    });
  }
};

export const insertUser = async (req, res) => {
  try {
    const { username, email, password, role, profile } = matchedData(req, {
      locations: ["body"],
    });

    const passwordHashed = await hashPassword(password);

    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
      role,
      profile,
    });

    return res.status(201).json({
      message: `Usuario creado con su perfil correctamente`,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userData = matchedData(req, {
      locations: ["body"],
    });

    const { id } = matchedData(req, {
      locations: ["params"],
    });

    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: userData },
      { returnDocument: "after" },
    ).select("-_id -password -createdAt -updatedAt -deletedAt");
    return res.status(200).json({
      message: "Usuario modificado",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    await UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: { deletedAt: new Date() } },
    );

    return res.status(200).json({
      message: "Usuario eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};
