const { createdRoomsDatabase } = require("../database")
const router = require("express").Router()

router.get("/:roomId", async (req, res) => {
  const room = await createdRoomsDatabase.find(req.params.roomId)
  if (!room) return res.status(404).send("404 - Cannot find room")

  res.render("room", { room })
})

router.delete("/:roomId", async (req, res) => {
  await createdRoomsDatabase.removeBy("id", req.params.roomId)

  res.send("OK")
})

module.exports = router
