const { createdRoomsService } = require("../services")
const router = require("express").Router()

router.get("/", async (req, res) => {
  const rooms = await createdRoomsService.load()

  res.render("index", { rooms })
})

module.exports = router
