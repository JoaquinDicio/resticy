import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //esto incluye la info decodificada del token en la req original
    next(); // continua con la siguiente solicitud
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

export default authMiddleware;
