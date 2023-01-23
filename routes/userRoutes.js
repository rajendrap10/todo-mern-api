// URL PATH
const express = require("express");
const { register, checkUser, login } = require("../controllers/userController");
const router = express(); // creating an express object

router.post("/register", register);
router.post("/checkUser", checkUser);
router.post("/login", login);

module.exports = router;
