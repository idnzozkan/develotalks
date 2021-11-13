const { roomsService } = require("../services")
const router = require("express").Router()

router.get("/", async (req, res) => {
  const rooms = await roomsService.load()

  res.send(rooms)
})

router.get("/search", async (req, res) => {
  const { ownerId, roomLang } = req.query

  const query = {}

  if (ownerId) query.owner = ownerId
  if (roomLang) query.roomLanguage = roomLang

  const rooms = await roomsService.query(query)

  res.send(rooms)
})

router.get("/:roomId", async (req, res) => {
  const room = await roomsService.find(req.params.roomId)
  if (!room) return res.status(404).send("404 - Cannot find room")

  res.send(room)
})

router.delete("/:roomId", async (req, res) => {
  await roomsService.removeBy("_id", req.params.roomId)

  res.send("OK")
})

router.patch("/:roomId", async (req, res) => {
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
    roomTags
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

  res.send("OK")
})

module.exports = router
