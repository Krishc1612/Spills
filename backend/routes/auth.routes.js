const express = require("express")
const authControllers = require('../controllers/auth.controller')

const router = express.Router()

router.post("/user/register", authControllers.registerUser)

module.exports = router