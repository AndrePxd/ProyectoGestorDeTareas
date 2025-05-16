const Task = require("../models/task");
const { Op } = require("sequelize");


exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      userId: req.user.id,
    });
    res.status(201).json({ message: "Tarea creada", task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const { status, search, startDate, endDate } = req.query;

  let where = { userId: req.user.id };

  if (status) where.status = status;

  if (search) {
    where.title = { [Op.iLike]: `%${search}%` };
  }

  if (startDate || endDate) {
    where.dueDate = {};
    if (startDate) where.dueDate[Op.gte] = new Date(startDate);
    if (endDate) where.dueDate[Op.lte] = new Date(endDate);
  }

  try {
    const tasks = await Task.findAll({ where });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
  task ? res.json(task) : res.status(404).json({ error: "No encontrada" });
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!task) return res.status(404).json({ error: "No encontrada" });

  if (task.status === "completada") return res.status(400).json({ error: "No modificable" });

  const { title, description, status, dueDate } = req.body;

  // Validaciones de transición de estado
  if (status === "pendiente" && task.status !== "pendiente")
    return res.status(400).json({ error: "No puede volver a pendiente" });

  if (status === "completada" && task.status !== "en progreso")
    return res.status(400).json({ error: "Solo desde 'en progreso'" });

  await task.update({ title, description, status, dueDate });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!task || task.status !== "completada")
    return res.status(400).json({ error: "Solo se eliminan tareas completadas" });

  await task.destroy();
  res.json({ message: "Tarea eliminada" });
};
