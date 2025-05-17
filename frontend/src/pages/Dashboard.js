import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import EditTaskModal from "../components/EditTaskModal";
import "../styles/General.css";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
    fetchTasks();
  }, [statusFilter, search, startDate, endDate]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          status: statusFilter || undefined,
          search: search || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error al obtener tareas:", err);
    }
  };

  const handleNewTask = () => fetchTasks();

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${updatedTask.id}`,
        {
          title: updatedTask.title,
          description: updatedTask.description,
          dueDate: updatedTask.dueDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
      setTaskToEdit(null);
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="filters-box">
        <span className="filters-title">Filtros</span>
        <div className="filters-row">
          <div className="filter-group">
            <label>Estado:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Todas</option>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Desde:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>

          <div className="filter-group">
            <label>Hasta:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>

          <div className="filter-group">
            <label>Buscar:</label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Título..." />
          </div>

          <div className="filter-group button-wrapper">
            <button
              className="clear-filters-btn"
              onClick={() => {
                setSearch("");
                setStatusFilter("");
                setStartDate("");
                setEndDate("");
              }}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      <div className="task-form-wrapper">
        <div className="task-board-header">
          <span className="filters-title">Tablero</span>
          <button className="open-task-form-btn" onClick={() => setShowFormModal(true)}>
            + Crear tarea
          </button>
        </div>

        <TaskList tasks={tasks} refreshTasks={fetchTasks} onEdit={handleEditTask} />
      </div>

      <EditTaskModal
        task={taskToEdit}
        onUpdate={handleUpdateTask}
        onClose={() => setTaskToEdit(null)}
      />

      {showFormModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Nueva Tarea</h3>
            <TaskForm
              onCreate={() => {
                handleNewTask();
                setShowFormModal(false);
              }}
              onCancel={() => setShowFormModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
