const express = require("express")
const { pinUser, allPins } = require("../controllers/pinControllers")

const pinRouter = express.Router()

pinRouter.get("/all", allPins)
pinRouter.post("/pin", pinUser)

module.exports = pinRouter