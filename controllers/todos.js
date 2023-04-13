const Todo = require("../models/Todo");
const { v4 : uuidv4 } = require('uuid')

const addToDo = async (req, res) => {
    const {value: title} = req.body;
    try {
        const todo = new Todo({title})
        todo.isEditing = false
        todo.todoId = uuidv4();
        await todo.save()
        return res.status(200).json({
            ok: true,
            todo: todo,
          });

    } catch (error){
        return res.status(503).json({
            ok: false,
            msg: "Something happened...",
          });
    }

    
}

const getToDos = async (req, res) => {
    try {
        const todos = await Todo.find()
        return res.status(200).json({
            ok: true,
            todos: todos,
          });

    } catch (error){
        return res.status(503).json({
            ok: false,
            msg: "Something happened...",
          });
    }
}

const deleteTodos = async (req, res) => {
    const {todoId} = req.params
    try {
       await Todo.deleteOne ({todoId:todoId})
       return res.status(200).json ({
        ok: true,
        msg: "Deleted ok",
       })
    } catch (error){
        return res.status(503).json({
            ok: false,
            msg: "Something happened...",
          });
    }};

const editTodos = async (req, res) => {
    
}



module.exports = {addToDo, getToDos, deleteTodos}