const router = require("express").Router()
const { getRooms, searchRooms, getRoom, deleteRoom, updateRoom } = require("../controllers/rooms")

router.get("/", getRooms)

router.get("/search", searchRooms)

router.get("/:roomId", getRoom)

router.delete("/:roomId", deleteRoom)

router.patch("/:roomId", updateRoom)

module.exports = router
