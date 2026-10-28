import jwt from "jsonwebtoken";

export const generateToken = async (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    throw new Error(`Error generando el token, ${error.message}`);
  }
};

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error(`Error verificando el token, ${error.message}`);
  }
};
