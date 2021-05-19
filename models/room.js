const { v4: uuidv4 } = require("uuid")
class Room {
  constructor(
    owner,
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
  ) {
    this.id = uuidv4()
    this.owner = owner
    this.participants = [owner]
    this.title = title
    this.description = description
    this.roomLanguage = roomLanguage
    this.kickedPeople = []
    this.waitingPeople = []
    this.maxParticipants = maxParticipants
    this.canUseMic = canUseMic
    this.canUseWebcam = canUseWebcam
    this.canShareScreen = canShareScreen
    this.canTypeToChatBox = canTypeToChatBox
    this.isPrivate = isPrivate
    this.roomTags = roomTags
    this.createdAt = Date.now()
  }

  static create({
    id,
    owner,
    participants,
    title,
    description,
    roomLanguage,
    kickedPeople,
    waitingPeople,
    maxParticipants,
    canUseMic,
    canUseWebcam,
    canShareScreen,
    canTypeToChatBox,
    isPrivate,
    roomTags,
    createdAt
  }) {
    const newRoom = new Room(
      owner,
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

    newRoom.id = id
    newRoom.participants = participants
    newRoom.kickedPeople = kickedPeople
    newRoom.waitingPeople = waitingPeople
    newRoom.createdAt = createdAt

    return newRoom
  }
}

module.exports = Room
