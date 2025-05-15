import React, { useEffect, useState } from 'react';

function PaginaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate que el token se guarda ahí
        const response = await fetch('http://localhost:3001/api/usuarios', {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar los usuarios');
        }

        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Usuarios Registrados</h2>
      {error && <p style={styles.error}>{error}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol_id === 1 ? 'Administrador' : 'Usuario'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '24px',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
  },
  th: {
    backgroundColor: '#333',
    color: '#fff',
  },
  td: {
    border: '1px solid #ccc',
    padding: '0.5rem',
  },
};

export default PaginaUsuarios;