const router = require("express").Router()
const { getUsers, createUser, getUser, deleteUser, join, leave, acceptUser, banUser, unbanUser, updateUser } = require("../controllers/users")
const { createRoom } = require("../services/users-service")

router.get("/", getUsers)

router.post("/", createUser)

router.get("/:userId", getUser)

router.delete("/:userId", deleteUser)

router.post("/:userId/join", join)

router.post("/:userId/disconnect", leave)

router.post("/:userId/createdRoom", createRoom)

router.post("/:ownerId/accept", acceptUser)

router.post("/:ownerId/ban", banUser)

router.post("/:ownerId/unban", unbanUser)

router.patch("/:userId", updateUser)

module.exports = router
