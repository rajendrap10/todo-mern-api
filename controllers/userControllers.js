// LOGIC, BL
const User = require("../models/userModel");

exports.home = (req, res) => {
  res.send("Hello  Alpha ");
};

exports.aboutus = (req, res) => {
  res.send("This is about us !!!!");
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    // To check all the details
    if (!name || !email) {
      throw new Error("Name and Email are Required");
    }
    const userExits = await User.findOne({ email });
    if (userExits) {
      throw new Error("Email Already Exists");
    }
    // Inserting into the Database

    const user = await User.create({ name, email });
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.id, req.body);
    if(user) {
          res.status(200).json({
            success: true,
            message: "User updated Successfully",
          });
    } else {
          res.status(401).json({
          success: false,
          message: "User update failed.",
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

exports.deleteUser = async (req, res) => {

try {

    const user = await User.findByIdAndRemove(req.params.id);
      if (!user){
          res.status(401).json({
            success: false,
            message: err,
          });
      }
      else {
          res.status(200).json({
            success: true,
            message: 'User has been deleted, successfully.',
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
