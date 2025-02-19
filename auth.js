const jwt = require("jsonwebtoken");
const db = require("./db");
const secretKey = "f16s5d4fs";
const crypto = require('crypto');

const login = async (cedula, password) =>
{
    console.log(MD5(password));
    let rows = await db.authEmpleado(cedula, MD5(password));
    if (rows.length == 1) {
        const token = jwt.sign({ cedula, rol: rows[0].rol }, secretKey, { expiresIn: "1h" });
        return {token, user: false};
    }

    rows = await db.authUsuario(cedula, MD5(password));

    if (rows.length == 1) {
      const token = jwt.sign({ cedula, user: true }, secretKey, { expiresIn: "1h" });
      return {token, user : true};
  }
        
    return {token : ""};
}

const verifyToken = (req, res, next) =>
{
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provied" });
    }
    try {
      const payload = jwt.verify(token, secretKey);
      req.session = payload;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token not valid" });
    }
}

function MD5(texto) {
  return crypto.createHash('md5').update(texto).digest('hex');
}

module.exports = {login, verifyToken, MD5}