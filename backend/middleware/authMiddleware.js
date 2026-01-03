const jwt = require("jsonwebtoken");
const SECRET = "inventario2025";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ msg: "Token requerido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};
