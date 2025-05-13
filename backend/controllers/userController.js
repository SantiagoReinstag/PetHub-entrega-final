const db = require('../db'); 

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [newUser] = await db('users').insert({ username, password }).returning('*');
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

module.exports = { createUser };
