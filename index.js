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

app.listen(8080, () => {
    console.log("Listening on port 8080")
});