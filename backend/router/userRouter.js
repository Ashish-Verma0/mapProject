const express = require("express")
const { newUser, login } = require("../controllers/userController")

const userRouter = express.Router()

userRouter.post("/register", newUser)
userRouter.post("/login", login)

module.exports = userRouter