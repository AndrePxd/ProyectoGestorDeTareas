import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/General.css"; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleTheme = () => {
    const body = document.body;
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h3>Gestor de Tareas</h3>
      </div>
      <div className="navbar-right">
        <span>👤 {user?.name}</span>
        <button className="theme-toggle" onClick={toggleTheme}>🌓 Modo</button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
