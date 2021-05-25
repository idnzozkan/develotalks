const { createdRoomsDatabase } = require("../database")
const router = require("express").Router()

router.get("/:roomId", async (req, res) => {
  const room = await createdRoomsDatabase.find(req.params.roomId)
  if (!room) return res.status(404).send("404 - Cannot find room")

  res.render("room", { room })
})

module.exports = router
