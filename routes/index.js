const { createdRoomsDatabase } = require("../database")
const router = require("express").Router()

router.get("/", async (req, res) => {
  const rooms = await createdRoomsDatabase.load()

  res.render("index", { rooms })
})

module.exports = router
