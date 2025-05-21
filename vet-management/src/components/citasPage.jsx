import React, { useEffect, useState } from 'react';
import api from '../axiosconfig';
import './MisMascotas.css';

const CitasPage = () => {
  const [citas, setCitas] = useState([]);
  const [formulario, setFormulario] = useState({
    fecha: '',
    hora: '',
    descripcion: '',
    mascotaId: '',
  });

  const esAdmin = localStorage.getItem('rol') === 'admin';

  const obtenerCitas = async () => {
    try {
      const endpoint = esAdmin ? '/citas/admin' : '/citas/activas';
      const res = await api.get(endpoint);
      setCitas(res.data);
    } catch (err) {
      console.error('Error al obtener citas:', err);
    }
  };

  useEffect(() => {
    obtenerCitas();
  }, [esAdmin]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formulario.fecha || !formulario.hora || !formulario.descripcion || !formulario.mascotaId) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const datos = {
      fecha: formulario.fecha,
      hora: formulario.hora,
      descripcion: formulario.descripcion,
      mascotaId: Number(formulario.mascotaId),
    };

    try {
      const res = await api.post('/citas', datos);
      if (res.status >= 200 && res.status < 300) {
        alert('Cita creada exitosamente. Por favor, recargue la página para confirmar.');
        setFormulario({ fecha: '', hora: '', descripcion: '', mascotaId: '' });

      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert(err.response.data);
      } else if (err.response && err.response.status === 400) {
        alert("Datos inválidos: " + err.response.data);
      } else {
        console.error('Error desconocido:', err);
        alert('Error al crear cita');
      }
    }
  };

  const handleDesactivar = async (id) => {
    try {
      await api.patch(`/citas/desactivar/${id}`);
      setCitas(citas.map(c => (c.id === id ? { ...c, activo: false } : c)));
    } catch (err) {
      console.error('Error al desactivar cita:', err);
      alert('Error al cancelar cita');
    }
  };

  const handleEliminar = async (id) => {
    try {
      await api.delete(`/citas/${id}`);
      setCitas(citas.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error al eliminar cita:', err);
      alert('Error al eliminar cita');
    }
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">Citas</h2>

      <form onSubmit={handleSubmit} className="formulario">
        <input
          type="date"
          name="fecha"
          value={formulario.fecha}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="hora"
          value={formulario.hora}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={formulario.descripcion}
          onChange={handleChange}
          required
          className="flexible"
        />
        <input
          type="number"
          name="mascotaId"
          placeholder="ID de mascota"
          value={formulario.mascotaId}
          onChange={handleChange}
          required
          className="edad"
          min={1}
        />
        <button type="submit">Agendar Cita</button>
      </form>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha y Hora</th>
            <th>Descripción</th>
            <th>Mascota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.filter(c => c.activo).map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{new Date(c.fecha_cita).toLocaleString()}</td>
              <td>{c.motivo}</td>
              <td>{c.mascota_id}</td>
              <td>
                {esAdmin ? (
                  <button
                    onClick={() => {
                      if (window.confirm('¿Eliminar permanentemente esta cita?')) {
                        handleEliminar(c.id);
                      }
                    }}
                    className="boton-eliminar"
                  >
                    Eliminar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (window.confirm('¿Cancelar esta cita?')) {
                        handleDesactivar(c.id);
                      }
                    }}
                  >
                    Cancelar
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

export default CitasPage;
