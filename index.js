const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;


app.use(cors());


const TodoItemRoute = require('./routes/UserRoutes');


mongoose.connect(process.env.DB_CNN)
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))


app.use('/', TodoItemRoute);



app.listen(PORT, ()=> console.log("Server connected") );