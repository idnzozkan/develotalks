const express = require("express")
const { stringify } = require("flatted")
const { createdRoomsDatabase, usersDatabase } = require("./database")
const app = express()

app.set("view engine", "pug")

app.get("/u/:id", async (req, res) => {
  const user = await usersDatabase.find(req.params.id)
  if (!user) return res.status(404).send("404 - Cannot find user")

  res.render("user", { user })
})

app.get("/r/:id", async (req, res) => {
  const room = await createdRoomsDatabase.find(req.params.id)
  if (!room) return res.status(404).send("404 - Cannot find room")

  res.render("room", { room })
})

app.get("/", async (req, res) => {
  const rooms = await createdRoomsDatabase.load()
  res.render("index", { rooms })
})

app.listen(3000, () => {
  console.log("started listening")
})
