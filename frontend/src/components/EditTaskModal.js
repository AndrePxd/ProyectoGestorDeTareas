import React, { useState, useEffect } from "react";
import "../styles/General.css"; 

const EditTaskModal = ({ task, onUpdate, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const today = new Date().toISOString().split("T")[0]; 

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...task, title, description, dueDate });
  };

  if (!task) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Editar Tarea</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={today}
          />
          <div className="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
