require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await db("usuarios").where({ email }).first();

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (!usuario.activo) {
      return res.status(403).json({ mensaje: "Usuario eliminado o desactivado" });
    }

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const rol = typeof usuario.rol_id === 'number' ? usuario.rol_id : (usuario.rol_id || 2);
    const id = usuario.id;  // <----- Agregado

    const token = jwt.sign(
      { id, rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, id }); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

module.exports = {login};
