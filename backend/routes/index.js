const { roomsService } = require("../services")
const router = require("express").Router()

router.get("/ping", async (req, res) => {
  res.send("pong!")
})

module.exports = router
