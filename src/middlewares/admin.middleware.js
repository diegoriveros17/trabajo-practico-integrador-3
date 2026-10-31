export const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ msg: "Acceso Denegado: Se requiere permisos de Administrador" });
  }
  next();
};
