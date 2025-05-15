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

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Convertir rol_id a número si es string o asignar "user" por defecto
    const rol = typeof usuario.rol_id === 'number' ? usuario.rol_id : (usuario.rol_id || 2);

    const token = jwt.sign(
      { id: usuario.id, rol: rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

module.exports = {login};
