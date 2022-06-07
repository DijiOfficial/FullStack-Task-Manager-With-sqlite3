// lib and imports
const express = require("express");
const app = express();

const task = require("./controllers/task")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  // callback
  res.render('tasks.ejs');
});

// Create here your api setup

app.post("/api/addTask", (req, res) => {
  task.addTask(req.body);
});

app.post("/api/requestTask", (req, res) => {
  // console.log("tesing");
  task.loadTasks(req, res)
});

app.post("/api/removeTask", (req, res) => {
  // console.log(req.body, typeof req.body);
  task.removeTask(req.body)
});



app.listen(3000, () => console.log("Server Up and running"));
