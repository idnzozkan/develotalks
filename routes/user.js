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
    user.activeRoom?.id == room.id
  ) {
    return res.send("You are already in this room")
  }

  if (user.activeRoom) {
    user.activeRoom.participants = user.activeRoom.participants.filter(p => p.id !== user.id)
    await createdRoomsDatabase.update(user.activeRoom)

    user.activeRoom = null
    await usersDatabase.update(user)

    user.joinRoom(room)
    await usersDatabase.update(user)
    await createdRoomsDatabase.update(room)

    console.log(colors.magenta(`${user.name} left`))
  } else if (user.waitingRoom) {
    user.waitingRoom.waitingPeople = user.waitingRoom.waitingPeople.filter(u => u.id !== user.id)
    await createdRoomsDatabase.update(user.waitingRoom)

    user.waitingRoom = null
    await usersDatabase.update(user)

    user.joinRoom(room)
    await usersDatabase.update(user)
    await createdRoomsDatabase.update(room)

    console.log(colors.magenta(`${user.name} left from the waiting room`))
  } else {
    user.joinRoom(room)
    await usersDatabase.update(user)
    await createdRoomsDatabase.update(room)
  }

  res.send("OK")
})

router.post("/:userId/createdRoom", async (req, res) => {
  const { userId } = req.params
  const {
    title,
    description,
    roomLanguage,
    maxParticipants,
    canUseMic,
    canUseWebcam,
    canShareScreen,
    canTypeToChatBox,
    isPrivate,
    roomTags
  } = req.body

  const user = await usersDatabase.find(userId)
  const room = user.createRoom(
    title,
    description,
    roomLanguage,
    maxParticipants,
    canUseMic,
    canUseWebcam,
    canShareScreen,
    canTypeToChatBox,
    isPrivate,
    roomTags
  )

  await createdRoomsDatabase.insert(room)

  res.send("OK")
})

router.post("/:ownerId/accept", async (req, res) => {
  const { ownerId } = req.params
  const { userId } = req.query

  const owner = await usersDatabase.find(ownerId)
  const user = await usersDatabase.find(userId)

  owner.acceptWaitingUser(user)

  await createdRoomsDatabase.update(owner.createdRoom)
  await usersDatabase.update(user)

  res.send("OK")
})

router.post("/:ownerId/ban", async (req, res) => {
  const { ownerId } = req.params
  const { userId } = req.query

  const owner = await usersDatabase.find(ownerId)
  const user = await usersDatabase.find(userId)

  owner.kickOutParticipant(user)

  await usersDatabase.update(user)
  await createdRoomsDatabase.update(owner.createdRoom)

  res.send("OK")
})

router.post("/:ownerId/unban", async (req, res) => {
  const { ownerId } = req.params
  const { userId } = req.query

  const owner = await usersDatabase.find(ownerId)
  const user = await usersDatabase.find(userId)

  owner.removeBan(user)

  await usersDatabase.update(user)
  await createdRoomsDatabase.update(owner.createdRoom)

  res.send("OK")
})

module.exports = router
