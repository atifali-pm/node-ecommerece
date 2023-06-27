const express = require("express");
const {loginController, registerController} = require("../controllers/userController");

const router = express.Router();

// POST | Login
router.post('/login', loginController )

// POST | Register
router.post('/register', registerController)

module.exports = router