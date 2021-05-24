const { v4: uuidv4 } = require("uuid")
class Room {
  constructor(
    id = uuidv4(),
    owner,
    participants = [owner],
    title,
    description,
    roomLanguage,
    kickedPeople = [],
    waitingPeople = [],
    maxParticipants,
    canUseMic,
    canUseWebcam,
    canShareScreen,
    canTypeToChatBox,
    isPrivate,
    roomTags,
    createdAt = Date.now()
  ) {
    this.id = id
    this.owner = owner
    this.participants = participants
    this.title = title
    this.description = description
    this.roomLanguage = roomLanguage
    this.kickedPeople = kickedPeople
    this.waitingPeople = waitingPeople
    this.maxParticipants = maxParticipants
    this.canUseMic = canUseMic
    this.canUseWebcam = canUseWebcam
    this.canShareScreen = canShareScreen
    this.canTypeToChatBox = canTypeToChatBox
    this.isPrivate = isPrivate
    this.roomTags = roomTags
    this.createdAt = createdAt
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
    return new Room(
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
    )
  }
}

module.exports = Room
