import React, { useEffect, useState } from 'react';

function PaginaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/users', {
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
      <h1 style={styles.header}>Lista de usuarios registrados</h1>
      <p style={styles.subtitle}>Aquí puedes ver la información básica de cada cuenta en el sistema.</p>
      {error && <p style={styles.error}>⚠️ {error}</p>}
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Correo</th>
            <th style={styles.th}>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td style={styles.td}>{usuario.id}</td>
              <td style={styles.td}>{usuario.nombre}</td>
              <td style={styles.td}>{usuario.email}</td>
              <td style={styles.td}>
                {usuario.rol_id === 1 ? 'Administrador' : 'Usuario'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: '28px',
    marginBottom: '0.5rem',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#555',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  th: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    textAlign: 'left',
    padding: '12px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    fontSize: '14px',
  },
};

export default PaginaUsuarios;
