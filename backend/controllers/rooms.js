const { roomsService, usersService } = require("../services/internal")
const hmsService = require("../services/external/hms-service")
const socket = require('../lib/socket')

const getRooms = async (req, res) => {
  const rooms = await roomsService.load().sort({ createdAt: 'desc' })

  res.send(rooms)
}

const createRoom = async (req, res, next) => {
  const userId = req.user._id
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
    const dbRoom = await usersService.createRoom(
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

    const hmsRoom = await hmsService.createRoom(dbRoom._id)

    dbRoom.hmsId = hmsRoom.id
    await dbRoom.save();

    const rooms = await roomsService.load().sort({ createdAt: 'desc' })
    socket().emit('rooms:updated', rooms)

    res.send(dbRoom)
  } catch (e) {
    next(e)
  }
}

const joinRoom = async (req, res, next) => {
  const { _id: userId } = req.user
  const { roomId } = req.query

  try {
    await usersService.joinRoom(userId, roomId)

    const rooms = await roomsService.load().sort({ createdAt: 'desc' })
    socket().emit('rooms:updated', rooms)

    res.send("OK")
  } catch (e) {
    next(e)
  }
}

const leaveRoom = async (req, res) => {
  const user = await usersService.find(req.user._id)

  await usersService.stopSession(user)

  const rooms = await roomsService.load().sort({ createdAt: 'desc' })
  socket().emit('rooms:updated', rooms)

  res.send("OK")
}

const searchRooms = async (req, res) => {
  const { ownerId, roomLang } = req.query

  const query = {}

  if (ownerId) query.owner = ownerId
  if (roomLang) query.roomLanguage = roomLang

  const rooms = await roomsService.query(query)

  res.send(rooms)
}

const getRoom = async (req, res) => {
  const room = await roomsService.find(req.params.roomId)
  if (!room) return res.status(404).send("404 - Cannot find room")

  res.send(room)
}

const deleteRoom = async (req, res) => {
  await roomsService.removeBy("_id", req.params.roomId)

  const rooms = await roomsService.load().sort({ createdAt: 'desc' })
  socket().emit('rooms:updated', rooms)

  res.send("OK")
}

const updateRoom = async (req, res) => {
  const { roomId } = req.params
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

  const obj = {}

  if (title) obj.title = title
  if (description) obj.description = description
  if (roomLanguage) obj.roomLanguage = roomLanguage
  if (maxParticipants) obj.maxParticipants = maxParticipants
  if (canUseMic) obj.canUseMic = canUseMic
  if (canUseWebcam) obj.canUseWebcam = canUseWebcam
  if (canShareScreen) obj.canShareScreen = canShareScreen
  if (canTypeToChatBox) obj.canTypeToChatBox = canTypeToChatBox
  if (isPrivate) obj.isPrivate = isPrivate
  if (roomTags) obj.roomTags = roomTags

  await roomsService.update(roomId, obj)

  const rooms = await roomsService.load().sort({ createdAt: 'desc' })
  socket().emit('rooms:updated', rooms)

  res.send("OK")
}

module.exports = {
  getRooms,
  createRoom,
  joinRoom,
  leaveRoom,
  searchRooms,
  getRoom,
  deleteRoom,
  updateRoom
}
