import { CategoryModel } from "../models/category.model.js";
import { matchedData } from "express-validator";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = matchedData(req, {
      locations: ["body"],
    });

    const category = await CategoryModel.create({
      name,
      description,
    });

    return res.status(201).json({
      msg: "Categoria creada correctamente",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().select("-_id -password");

    return res.status(200).json({
      msg: "Categorias",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const category = await CategoryModel.findById(id).populate("events");

    return res.status(200).json({
      msg: "Categoria obtenida correctamente",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const CategoryData = matchedData(req, { locations: ["body"] });

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { $set: CategoryData },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      msg: "Categoria actualizada correctamente",
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    await CategoryModel.findByIdAndDelete(id);

    return res.status(200).json({
      msg: "Categoria eliminada",
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error interno del servidor ${error}`,
    });
  }
};
