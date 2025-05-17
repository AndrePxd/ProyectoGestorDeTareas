import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/General.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      navigate("/");
    } catch (err) {
      setError("Error al registrar. Verifica los datos.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="name"
          type="text"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
        {error && <p className="auth-error">{error}</p>}
      </form>
      <p>¿Ya tienes cuenta? <a href="/">Inicia sesión</a></p>
    </div>
  );
};

export default Register;
