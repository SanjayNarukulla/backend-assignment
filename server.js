const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;
app.use(express.json());

let tasks = []; // in-memory data store (array) to store tasks




//POST request
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    description: description || "",
  };

  tasks.push(newTask);
  res.status(200).json(newTask);
});


//GET All Tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});



//GET Single Task
app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  res.json(task);
});


//UPDATE the Task
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  if (title !== undefined) {
    if (title.trim() === "") {
      return res.status(400).json({ error: "Task title cannot be empty." });
    }
    task.title = title.trim();
  }

  if (description !== undefined) {
    task.description = description;
  }

  res.json(task);
});



//DELETE the Taks
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found." });
  }
  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully." });
});






app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
