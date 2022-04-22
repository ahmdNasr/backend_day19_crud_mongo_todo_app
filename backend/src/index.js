const cors = require("cors")
const express = require("express")

const TodosDAO = require("./db-access/todos-dao")

const PORT = process.env.PORT || 9000
const app = express()

app.use(cors())
app.use(express.json())

// logging middleware
app.use((req, _, next) => {
    console.log("new request –", req.method, req.url)
    next()
})

//==== ROUTES =====
app.get("/", (_, res) => {
    res.send("it works :)")
})

// GET ALL TODOS
app.get("/todos/all", (req, res) => {
    TodosDAO
    .findAllTodos()
    .then((allTodos) => res.json(allTodos))
    .catch(_ => res.status(500).json({ err: "Unknown error while reading todos." })) 
})

// POST NEW TODO
app.post("/todos/new", (req, res) => {
    const newTodo = {
        title: req.body.title,
        completed: false
    }

    TodosDAO
    .insertTodo(newTodo)
    .then(() => TodosDAO.findAllTodos())
    .then((allTodos) => res.json(allTodos))
    .catch(_ => res.status(500).json({ err: "Unknown error while saving your new todo." })) 
})

app.put("/todos/updateStatus", (req, res) => {
    const targetId = req.body.id
    const newCompleted = req.body.completed // true or false

    TodosDAO
    .updateTodo(targetId, { completed: newCompleted })
    .then(() => TodosDAO.findAllTodos())
    .then((allTodos) => res.json(allTodos))
    .catch(_ => res.status(500).json({ err: "Unknown error while updating this todo." }))
})

app.delete("/todos/delete/:id", (req, res) => {
    const targetId = req.params.id

    TodosDAO
    .deleteTodo(targetId)
    .then(() => TodosDAO.findAllTodos())
    .then((allTodos) => res.json(allTodos))
    .catch(_ => res.status(500).json({ err: "Unknown error while deleting this todo." }))
})

// not found middleware
app.use((_, res) => {
    res.status(404).json({ err: "Not found."})
})

app.listen(PORT, () => console.log("Server listening on Port", PORT))