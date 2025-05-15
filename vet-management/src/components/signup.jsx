import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Nombre:', nombre);
    console.log('Apellido:', apellido);
    console.log('Email:', email);
    console.log('Contraseña:', password);

    // Simulación de creación de cuenta
    navigate('/home');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Crear cuenta en PetHub</h1>
      <form style={styles.formContainer} onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Nombre"
          style={styles.input}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          style={styles.input}
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
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
        <button type="submit" style={styles.signupButton}>Crear cuenta</button>
      </form>
      <p style={styles.text}>¿Ya tienes una cuenta?</p>
      <button
        style={styles.loginButton}
        onClick={() => navigate('/')}
      >
        Iniciar sesión
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
  signupButton: {
    padding: 12,
    backgroundColor: '#00ccff',
    border: 'none',
    borderRadius: 5,
    color: '#004466',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: 15,
    transition: 'background-color 0.3s',
  },
  loginButton: {
    padding: 12,
    backgroundColor: '#007acc',
    border: 'none',
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  }
};
