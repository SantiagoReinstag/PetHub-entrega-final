import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); 
        localStorage.setItem('usuarioId', data.id);
        navigate('/home'); 
      } else {
        setError(data.mensaje || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenidos a PetHub</h1>
      <form style={styles.formContainer} onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          style={styles.input} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          style={styles.input} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={styles.loginButton}>Iniciar sesión</button>
        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      </form>
      <p style={styles.text}>¿No tienes cuenta?</p>
      <button 
        style={styles.signupButton} 
        onClick={() => navigate('/signup')}
      >
        Crear cuenta
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(135deg, #00aaff 0%, #004466 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  title: {
    fontSize: '3rem',
    marginBottom: 40,
    textShadow: '2px 2px 4px #003344'
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 30,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    border: 'none',
    fontSize: '1rem',
  },
  loginButton: {
    padding: 12,
    backgroundColor: '#007acc',
    border: 'none',
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: 15,
    transition: 'background-color 0.3s',
  },
  signupButton: {
    padding: 12,
    backgroundColor: '#00ccff',
    border: 'none',
    borderRadius: 5,
    color: '#004466',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  }
};
