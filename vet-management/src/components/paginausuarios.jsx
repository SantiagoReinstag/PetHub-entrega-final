import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const PaginaUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuario = async (userId) => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3001/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 404) throw new Error("Usuario no encontrado");
          else throw new Error("Error al cargar perfil");
        }

        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token guardado, por favor inicia sesión");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      if (!userId) {
        setError("No se pudo extraer el ID del token");
        setLoading(false);
        return;
      }

      obtenerUsuario(userId);
    } catch {
      setError("Token inválido o corrupto");
      setLoading(false);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  const abrirModal = () => {
    setMostrarModal(true);
    setPassword("");
    setMensaje("");
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const handleEliminarCuenta = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const res = await fetch(`http://localhost:3001/users/desactivar/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.mensaje || "Error al eliminar cuenta");
        return;
      }

      localStorage.removeItem("token");
      navigate("/"); 
    } catch (err) {
      setMensaje("Error de red o servidor");
    }
  };

  if (loading) return <p className="centrado">Cargando perfil...</p>;
  if (error) return <p className="centrado error">{error}</p>;
  if (!usuario) return <p className="centrado">No se encontró usuario.</p>;

  return (
    <div className="contenedor perfil">
      <h1>Mi perfil</h1>
      <table className="tabla">
        <tbody>
          <tr>
            <th>Nombre</th>
            <td>{usuario.nombre}</td>
          </tr>
          <tr>
            <th>Correo</th>
            <td>{usuario.email}</td>
          </tr>
          <tr>
            <th>Rol</th>
            <td>{usuario.rol_id === 1 ? "Administrador" : "Usuario"}</td>
          </tr>
        </tbody>
      </table>

      <div className="botones">
        <button className="cerrar" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
        <button className="eliminar" onClick={abrirModal}>
          Eliminar cuenta
        </button>
      </div>

      {mostrarModal && (
        <div className="modal-fondo">
          <div className="modal">
            <h2>Confirmar eliminación</h2>
            <p>Ingresa tu contraseña para confirmar:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {mensaje && <p className="error">{mensaje}</p>}
            <div className="modal-botones">
              <button className="confirmar" onClick={handleEliminarCuenta}>
                Eliminar
              </button>
              <button className="cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginaUsuario;
