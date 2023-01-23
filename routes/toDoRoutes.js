// URL PATH
const express = require('express'); 
const { getToDos, createToDo, editToDo, deleteToDo,toDoDone } = require("../controllers/toDoController");
const router = express(); // creating an express object

router.get("/getToDos/:toDoStatus/:toDoDate", getToDos);
router.post("/createToDo", createToDo);
router.put("/editToDo", editToDo);
router.delete("/deleteToDo/:id", deleteToDo);
router.put("/toDoDone", toDoDone);


module.exports = router;