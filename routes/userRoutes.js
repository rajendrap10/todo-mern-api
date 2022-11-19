// URL PATH
const express = require('express'); 
const { home, createUser, getUsers, editUser, deleteUser } = require("../controllers/userControllers");
const router = express(); // creating an express object

console.log('inside...');
router.get("/", home);
router.get("/getUsers", getUsers);
router.post("/createUser", createUser);
router.post("/editUser", editUser);
router.get("/deleteUser/:id", deleteUser);

module.exports = router;
