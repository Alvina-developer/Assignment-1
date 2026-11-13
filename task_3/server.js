
const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory tasks array
let tasks = [
    {
        id: 1,
        title: "Learn HTML and CSS",
        description: "Practice HTML and CSS basics",
        completed: true
    },
    {
        id: 2,
        title: "Learn JavaScript",
        description: "Practice JavaScript concepts",
        completed: false
    },
    {
        id: 3,
        title: "Learn Node.js",
        description: "Understand Node.js basics",
        completed: false
    },
    {
        id: 4,
        title: "Learn Express.js",
        description: "Build an API using Express",
        completed: false
    },
    {
        id: 5,
        title: "Practice Postman",
        description: "Test API endpoints",
        completed: true
    }
];

// =========================
// HEALTH CHECK
// GET /api/health
// =========================
app.get("/api/health", (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Server is running"
    });
});

// =========================
// GET ALL TASKS
// GET /api/v1/tasks
// =========================
app.get("/api/v1/tasks", (req, res) => {

    return res.status(200).json({
        status: true,
        message: "Tasks fetched successfully",
        totalTasks: tasks.length,
        data: tasks
    });
});

// =========================
// CREATE TASK
// POST /api/v1/tasks
// =========================
app.post("/api/v1/tasks", (req, res) => {

    console.log(req.body, "req.body");

    const { title, description, completed } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            status: false,
            message: "Task title is required"
        });
    }

    if (
        completed !== undefined &&
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({
            status: false,
            message: "Completed must be true or false"
        });
    }

    const task = {
        id: tasks.length
            ? Math.max(...tasks.map((task) => task.id)) + 1
            : 1,
        title: title.trim(),
        description: description ?? "",
        completed: completed ?? false
    };

    tasks.push(task);

    return res.status(201).json({
        status: true,
        message: "Task created successfully",
        data: task
    });
});

// =========================
// GET SINGLE TASK
// GET /api/v1/tasks/:id
// =========================
app.get("/api/v1/tasks/:id", (req, res) => {

    console.log(req.params, "req.params");

    const { id } = req.params;

    const task = tasks.find(
        (task) => task.id === Number(id)
    );

    if (!task) {
        return res.status(404).json({
            status: false,
            message: "Task not found"
        });
    }

    return res.status(200).json({
        status: true,
        message: "Task fetched successfully",
        data: task
    });
});

// =========================
// UPDATE TASK
// PUT /api/v1/tasks/:id
// =========================
app.put("/api/v1/tasks/:id", (req, res) => {

    const { id } = req.params;

    const task = tasks.find(
        (task) => task.id === Number(id)
    );

    if (!task) {
        return res.status(404).json({
            status: false,
            message: "Task not found"
        });
    }

    const { title, description, completed } = req.body;

    if (
        title !== undefined &&
        (typeof title !== "string" || !title.trim())
    ) {
        return res.status(400).json({
            status: false,
            message: "Title must be a non-empty string"
        });
    }

    if (
        completed !== undefined &&
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({
            status: false,
            message: "Completed must be true or false"
        });
    }

    task.title = title === undefined ? task.title : title.trim();
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;

    return res.status(200).json({
        status: true,
        message: "Task updated successfully",
        data: task
    });
});

// =========================
// DELETE TASK
// DELETE /api/v1/tasks/:id
// =========================
app.delete("/api/v1/tasks/:id", (req, res) => {

    const { id } = req.params;

    const taskIndex = tasks.findIndex(
        (task) => task.id === Number(id)
    );

    if (taskIndex === -1) {
        return res.status(404).json({
            status: false,
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    return res.status(200).json({
        status: true,
        message: "Task deleted successfully",
        data: deletedTask
    });
});

// =========================
// 404 ROUTE
// =========================
app.use((req, res) => {

    return res.status(404).json({
        status: false,
        message: "Route not found"
    });
});

// =========================
// START SERVER
// =========================
const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
