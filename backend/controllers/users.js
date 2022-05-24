const { usersService } = require("../services")
const router = require("express").Router()

const getUsers = async (req, res) => {
  const users = await usersService.load()

  res.send(users)
}

const createUser = async (req, res, next) => {
  try {
    const user = await usersService.insert(req.body)
    res.send(user)
  } catch (e) {
    next(e)
  }
}

const getUser = async (req, res) => {
  const user = await usersService.find(req.params.userId)
  if (!user) return res.status(404).send("404 - Cannot find user")

  res.send(user)
}

const deleteUser = async (req, res) => {
  await usersService.removeBy("_id", req.params.userId)

  res.send("OK")
}

const join = async (req, res, next) => {
  const { userId } = req.params
  const { roomId } = req.query

  try {
    await usersService.joinRoom(userId, roomId)
    res.send("OK")
  } catch (e) {
    next(e)
  }
}

const leave = router.post("/:userId/disconnect", async (req, res) => {
  const user = await usersService.find(req.params.userId)

  await usersService.stopSession(user)

  res.send("OK")
})

const createRoom = async (req, res, next) => {
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
    roomTags,
  } = req.body

  try {
    const room = await usersService.createRoom(
      userId,
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
    res.send(room)
  } catch (e) {
    next(e)
  }
}

const acceptUser = async (req, res) => {
  const { ownerId } = req.params
  const { userId } = req.query

  usersService.acceptWaitingUser(ownerId, userId)

  res.send("OK")
}

const banUser = async (req, res) => {
  const { ownerId } = req.params
  const { userId } = req.query

  usersService.kickOutParticipant(ownerId, userId)

  res.send("OK")
}

const unbanUser = async (req, res) => {
  const { ownerId } = req.params
  const { userId } = req.query

  usersService.removeBan(ownerId, userId)

  res.send("OK")
}

const updateUser = async (req, res) => {
  const { userId } = req.params
  const { name, profilePhoto, userBio, socialLinks, interests, spokenLangs } = req.body

  const obj = {}

  if (name) obj.name = name
  if (profilePhoto) obj.profilePhoto = profilePhoto
  if (userBio) obj.userBio = userBio
  if (socialLinks) obj.socialLinks = socialLinks
  if (interests) obj.interests = interests
  if (spokenLangs) obj.spokenLangs = spokenLangs

  await usersService.update(userId, obj)

  res.send("OK")
}

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  join,
  leave,
  createRoom,
  acceptUser,
  banUser,
  unbanUser,
  updateUser
}
