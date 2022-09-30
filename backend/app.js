const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const express = require("express")
const err = require("./middleware/err")
const pinRouter = require("./router/pinRouter")
const userRouter = require("./router/userRouter")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: "http://localhost:3000",
    Credential: true
}))

// router
app.use("/api/v1", userRouter)
app.use("/api/v1", pinRouter)

app.get("/", (req, res) => {
    res.send("hello world")
})
app.use(err)

module.exports = app