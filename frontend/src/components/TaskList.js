import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, refreshTasks, onEdit }) => {
  const grouped = {
    pendiente: [],
    "en progreso": [],
    completada: [],
  };

  // Agrupar tareas por estado
  tasks.forEach((task) => {
    if (grouped[task.status]) {
      grouped[task.status].push(task);
    }
  });

  return (
    <div className="task-board">
      <div className="task-column">
        <h3>Pendiente</h3>
        {grouped.pendiente.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            refreshTasks={refreshTasks}
            onEdit={onEdit}
          />
        ))}
      </div>

      <div className="task-column">
        <h3>En progreso</h3>
        {grouped["en progreso"].map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            refreshTasks={refreshTasks}
            onEdit={onEdit}
          />
        ))}
      </div>

      <div className="task-column">
        <h3>Completada</h3>
        {grouped.completada.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            refreshTasks={refreshTasks}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
