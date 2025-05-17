import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const TaskCard = ({ task, refreshTasks, onEdit }) => {
  const { token } = useContext(AuthContext);

  const updateStatus = async (newStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${task.id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      refreshTasks();
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshTasks();
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };

  return (
    <div className={`task-card ${task.status}`}>
  
    <h4>{task.title}</h4>
    {task.description && <p>{task.description}</p>}
    {task.dueDate && <p>Fecha límite: {task.dueDate}</p>}
  
    <div className="task-actions">
      {task.status === "pendiente" && (
        <button onClick={() => updateStatus("en progreso")}>↪ A progreso</button>
      )}
  
      {task.status === "en progreso" && (
        <button onClick={() => updateStatus("completada")}>✅ Completar</button>
      )}
  
      {onEdit && (
        <button onClick={() => onEdit(task)}>📝 Editar</button>
      )}
  
      {task.status === "completada" && (
        <button onClick={deleteTask}>🗑 Eliminar</button>
      )}
    </div>
  </div>
  
  );
};

export default TaskCard;
