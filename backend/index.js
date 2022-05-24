const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const usersRouter = require("./routes/users")
const roomsRouter = require("./routes/rooms")
require("./mongo-connection")

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.set("view engine", "pug")

app.use("/users", usersRouter)
app.use("/rooms", roomsRouter)

module.exports = app
