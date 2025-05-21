import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import Dashboard from './components/dashboard';
import Home from './components/Home';

import PaginaUsuarios from './components/paginausuarios';
import MisMascotas from './components/MisMascotas'; 
import CitasPage from './components/citasPage';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<PaginaUsuarios />} />
        <Route path="/mascotas" element={<MisMascotas />} />
        <Route path="/citas" element={<CitasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
