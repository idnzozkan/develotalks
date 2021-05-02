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
    this.owner = owner;
    this.participants = [owner];
    this.title = title;
    this.description = description;
    this.roomLanguage = roomLanguage;
    this.kickedPeople = [];
    this.waitingPeople = [];
    this.maxParticipants = maxParticipants;
    this.canUseMic = canUseMic;
    this.canUseWebcam = canUseWebcam;
    this.canShareScreen = canShareScreen;
    this.canTypeToChatBox = canTypeToChatBox;
    this.isPrivate = isPrivate;
    this.roomTags = [roomTags];
    this.shareableLink = Math.floor(Math.random() * 90000) + 10000;
    this.createdAt = Date.now();
  }
}

module.exports = Room;
