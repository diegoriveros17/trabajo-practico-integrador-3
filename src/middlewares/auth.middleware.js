import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res
        .status(401)
        .json({ msg: "Debes iniciar sesion para poder continuar" });
    const payload = await verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token Invalido" });
  }
};
