import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/General.css";

const TaskForm = ({ onCreate, onCancel }) => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ title: "", description: "", dueDate: "" });
      setError("");
      onCreate(); // Actualiza lista y cierra modal
    } catch (err) {
      setError("Error al crear la tarea.");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Título de la tarea"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Descripción (opcional)"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={handleChange}
      />

      {error && <p className="task-error">{error}</p>}

      <div className="modal-actions">
        <button type="submit" className="btn-submit">Crear tarea</button>
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default TaskForm;
