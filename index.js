const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const indexRouter = require("./routes/index")
const userRouter = require("./routes/user")
const roomRouter = require("./routes/room")
require("./mongo-connection")

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.set("view engine", "pug")

app.use("/u", userRouter)
app.use("/r", roomRouter)
app.use("/", indexRouter)

module.exports = app
