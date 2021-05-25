const { usersDatabase, createdRoomsDatabase } = require("../database")
const colors = require("colors")

const router = require("express").Router()

router.get("/:userId", async (req, res) => {
  const user = await usersDatabase.find(req.params.userId)
  if (!user) return res.status(404).send("404 - Cannot find user")

  res.render("user", { user })
})

router.post("/", async (req, res) => {
  const user = await usersDatabase.insert(req.body)

  res.send(user)
})

router.delete("/:userId", async (req, res) => {
  await usersDatabase.removeBy("id", req.params.userId)

  res.send("OK")
})

router.post("/:userId/join", async (req, res) => {
  const { userId } = req.params
  const { roomId } = req.query

  const user = await usersDatabase.find(userId)
  const room = await createdRoomsDatabase.find(roomId)

  if (room.maxParticipants <= room.participants.length) {
    return res.send("Room is full")
  } else if (room.kickedPeople.some(bannedUser => bannedUser.id == user.id)) {
    return res.send("You have been banned from this room before")
  } else if (
    room.participants.some(participant => participant.id == user.id) ||
    user.onlineAtRoom?.id == room.id
  ) {
    return res.send("You are already in this room")
  }

  if (user.onlineAtRoom) {
    if (user.isInAWaitingRoom) {
      user.onlineAtRoom.waitingPeople = user.onlineAtRoom.waitingPeople.filter(
        waitingUser => waitingUser.id !== user.id
      )
      user.isInAWaitingRoom = false
    }
    user.onlineAtRoom.participants = user.onlineAtRoom.participants.filter(
      participant => participant.id !== user.id
    )
    await createdRoomsDatabase.update(user.onlineAtRoom)

    user.onlineAtRoom = null
    await usersDatabase.update(user)

    console.log(colors.magenta(`${user.name} left`))
  }

  user.joinRoom(room)
  await usersDatabase.update(user)
  if (user.createdRoom) await createdRoomsDatabase.update(user.createdRoom)
  await createdRoomsDatabase.update(room)

  res.send("OK")
})

module.exports = router
