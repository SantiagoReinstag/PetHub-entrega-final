import React, { useEffect, useState } from 'react';
import api from '../axiosconfig'; 

const MisMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    tipo: '',
    edad: '',
  });

  const obtenerMascotas = async () => {
    try {
      const res = await api.get('/mascotas');
      setMascotas(res.data);
    } catch (err) {
      console.error('Error al obtener mascotas:', err);
    }
  };

  useEffect(() => {
    obtenerMascotas();
  }, []);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/mascotas', formulario);
      setMascotas([...mascotas, res.data]);
      setFormulario({ nombre: '', tipo: '', edad: '' });
    } catch (err) {
      console.error('Error al crear mascota:', err);
    }
  };

  return (
    <div>
      <h2>Mis Mascotas</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={formulario.tipo}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formulario.edad}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar Mascota</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((m) => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.tipo}</td>
              <td>{m.edad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisMascotas;
