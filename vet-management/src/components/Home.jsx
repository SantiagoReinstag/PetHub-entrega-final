import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const irAPerfil = () => navigate('/perfil');
  const irAMascotas = () => navigate('/mascotas');
  const irACitas = () => navigate('/citas'); 

  return (
    <div className="home-container">
      <h1 className="home-title">¡Bienvenido a PetHub!</h1>
      <p className="home-description">Tu espacio para cuidar, organizar y mimar a tus mascotas</p>
      <div className="button-group">
        <button className="home-button" onClick={irAPerfil}>
          Mi perfil
        </button>
        <button className="home-button" onClick={irAMascotas}>
          Mis mascotas
        </button>
        <button className="home-button" onClick={irACitas}>
          Mis citas
        </button>
      </div>
    </div>
  );
}
