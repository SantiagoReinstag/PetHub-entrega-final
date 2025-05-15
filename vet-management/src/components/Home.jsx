import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">¡Bienvenido a PetHub!</h1>
      <p className="home-description">Tu espacio para cuidar, organizar y mimar a tus mascotas</p>
      <div className="button-group">
        <button className="home-button" onClick={() => navigate('/perfil')}>Mi perfil</button>
        <button className="home-button" onClick={() => navigate('/mascotas')}>Mis mascotas</button>
        <button className="home-button" onClick={() => navigate('/citas')}>Mis citas</button>
      </div>
    </div>
  );
}
