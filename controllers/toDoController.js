// LOGIC, BL
const ToDo = require("../models/toDoModel");

exports.createToDo = async (req, res) => {
  try {
    const { title } = req.body;
    // To check all the details
    if (!title) {
      throw new Error("Title is Required");
    }
    // Inserting into the Database

    const todo = await ToDo.create({ title, userId: req.userCred._id });
    res.status(201).json({
      success: true,
      message: "ToDo Created Successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getToDos = async (req, res) => {
  try {
    let toDoStatus = req.params.toDoStatus ? req.params.toDoStatus : 1;
    let toDoDate = req.params.toDoDate ? req.params.toDoDate : 1;
    
    let todos = false;
    if(toDoStatus==1) {
      todos = await ToDo.find({ userId: req.userCred._id }).sort({
        createdAt: toDoDate,
      });
    } else {
      toDoStatus = (toDoStatus==2) ? true : false;
      todos = await ToDo.find({isDone:toDoStatus}).sort({"createdAt":toDoDate});
    }

    if(todos) {
        res.status(200).json({
          success: true,
          todos,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editToDo = async (req, res) => {
  try {
    const todo = await ToDo.findByIdAndUpdate(req.body.id, req.body);
    if(todo) {
          res.status(200).json({
            success: true,
            message: "Updated, successfully.",
          });
    } else {
          res.status(401).json({
          success: false,
          message: "ToDo update failed.",
        });
    }

  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.toDoDone = async (req, res) => {
  try {
    const todo = await ToDo.findByIdAndUpdate(req.body.id, req.body);
    if(todo) {
          res.status(200).json({
            success: true,
            message: "Updated, successfully.",
          });
    } else {
          res.status(401).json({
          success: false,
          message: "Failed.",
        });
    }

  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteToDo = async (req, res) => {

try {

    const todo = await ToDo.findByIdAndRemove(req.params.id);
      if (!todo){
          res.status(401).json({
            success: false,
            message: err,
          });
      }
      else {
          res.status(200).json({
            success: true,
            message: 'Deleted, successfully.',
          });
      }

  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
