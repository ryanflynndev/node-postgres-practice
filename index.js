const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

//Routes

app.get("/todos", async(req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch(error){
        console.log(error.message);
    }
});

app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (error){
        console.log(error.message);
    }
});

app.post("/todos", async (req, res) => {
    try{
        const {description} = req.body;
        //This takes our description that we sent in and inserts into the todo table 
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch(error){
        console.log(error.message)
    }
});

app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params; //WHERE
        const { description } = req.body; //SET

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch(error){
        console.error(error.message);
    }
})

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.status(500).json("Todo was deleted!")
    } catch (error){
        console.error(error.message);
    }
});

app.listen(8080, () => {
    console.log("Listening on port 8080")
});