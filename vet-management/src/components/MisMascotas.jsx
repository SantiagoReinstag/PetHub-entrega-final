import React, { useEffect, useState } from 'react';
import api from '../axiosconfig';
import './MisMascotas.css';

const MisMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    tipo: '',
    edad: '',
  });

  const esAdmin = localStorage.getItem('rol') === 'admin';

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

  const handleDesactivar = async (id) => {
    try {
      await api.patch(`/mascotas/desactivar/${id}`);
      setMascotas(mascotas.map((m) => (m.id === id ? { ...m, activo: false } : m)));
    } catch (err) {
      console.error('Error al desactivar mascota:', err);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await api.delete(`/mascotas/${id}`);
      setMascotas(mascotas.filter((m) => m.id !== id));
    } catch (err) {
      console.error('Error al eliminar mascota:', err);
    }
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">Mis Mascotas</h2>

      <form onSubmit={handleSubmit} className="formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
          className="flexible"
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={formulario.tipo}
          onChange={handleChange}
          required
          className="flexible"
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formulario.edad}
          onChange={handleChange}
          required
          className="edad"
        />
        <button type="submit">Agregar</button>
      </form>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th> {/* Nueva columna ID */}
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.filter(m => m.activo).map(m => (
            <tr key={m.id}>
              <td>{m.id}</td><td>{m.nombre}</td><td>{m.tipo}</td><td>{m.edad}</td>
              <td>
                {esAdmin ? (
                  <button
                    onClick={() => {
                      if (window.confirm('¿Seguro que quieres eliminar el perfil de esta mascota?')) {
                        handleEliminar(m.id);
                      }
                    }}
                    className="boton-eliminar"
                  >
                    Eliminar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (window.confirm('¿Seguro que quieres desactivar el perfil de esta mascota?')) {
                        handleDesactivar(m.id);
                      }
                    }}
                  >
                    Desactivar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisMascotas;
