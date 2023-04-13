require("dotenv").config();


const express = require('express');
const cors = require('cors');
const {dbConnection} = require("./database/config");
const { addToDo, getToDos, deleteTodos } = require("./controllers/todos");
const userRoutes = require ("./routes/UserRoutes");

const app = express();
dbConnection();

app.use(cors());
app.use(express.json())

app.use("/users", userRoutes)

app.post("/todo", addToDo)
app.get("/todo", getToDos)
app.delete("/todo/:todoId", deleteTodos)

app.listen(process.env.PORT, () => {
  console.log('Server listening');
});