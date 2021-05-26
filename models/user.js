const Room = require("./room")
const colors = require("colors")
const { v4: uuidv4 } = require("uuid")

class User {
  constructor(
    id = uuidv4(),
    name,
    username,
    profilePhoto,
    userBio,
    socialLinks,
    interests,
    spokenLangs,
    friends = [],
    following = [],
    followers = [],
    messages = [],
    starCount = 0,
    starredUsers = [],
    activeRoom = null,
    createdRoom = null,
    waitingRoom = null
  ) {
    this.id = id
    this.name = name
    this.username = username
    this.profilePhoto = profilePhoto
    this.userBio = userBio
    this.socialLinks = socialLinks
    this.interests = interests
    this.spokenLangs = spokenLangs
    this.friends = friends
    this.following = following
    this.followers = followers
    this.messages = messages
    this.starCount = starCount
    this.starredUsers = starredUsers
    this.activeRoom = activeRoom
    this.createdRoom = createdRoom
    this.waitingRoom = waitingRoom
  }

  createRoom(
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
    const room = Room.create({
      owner: this,
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
    })
    this.createdRoom = room
    this.activeRoom = room

    return room
  }

  joinRoom(room) {
    if (room.isPrivate && this !== room.owner) {
      console.log(
        colors.bold.yellow(
          "This is a private room. You need to wait for you to be taken into the room by the owner."
        )
      )

      room.waitingPeople.push(this)
      this.waitingRoom = room
    } else {
      this.activeRoom = room
      room.participants.push(this)

      console.log(colors.green(`${this.name} joined ${room.owner.name}'s room`))
    }
  }

  // Owner methods
  kickOutParticipant(user) {
    if (this.id !== this.activeRoom?.owner.id) {
      console.log(colors.red("You do not have permission to do this"))
    } else if (this.id === this.activeRoom.owner.id && user.id === this.id) {
      console.log(colors.red("You cannot kick yourself. Try to disconnect."))
    } else {
      user.activeRoom = null
      this.createdRoom.participants = this.createdRoom.participants.filter(
        participant => participant.id !== user.id
      )
      this.createdRoom.kickedPeople.push(user)
      console.log(
        colors.red(`${colors.bold(`${user.name}`)} kicked by ${colors.bold(`${this.name}`)}`)
      )
    }
  }

  removeBan(user) {
    if (this.createdRoom?.id !== this.activeRoom?.id) {
      console.log(colors.red("You do not have permission to do this"))
    } else {
      this.createdRoom.kickedPeople = this.createdRoom.kickedPeople.filter(
        bannedUser => bannedUser.id !== user.id
      )
      console.log(colors.yellow(`${this.name} removed ${user.name}'s ban`))
    }
  }

  acceptWaitingUser(user) {
    if (this.createdRoom && this.activeRoom.id == this.createdRoom.id) {
      if (user && user.waitingRoom.id == this.createdRoom.id) {
        this.createdRoom.waitingPeople = this.createdRoom.waitingPeople.filter(
          waitingUser => waitingUser.id !== user.id
        )
        user.waitingRoom = null
        this.createdRoom.participants.push(user)
        user.activeRoom = this.createdRoom
        console.log(colors.cyan(`${this.name} accepted ${user.name}'s joining request`))
      }
    } else {
      console.log("Only room owner can do this action!")
    }
  }

  static create({
    id,
    name,
    username,
    profilePhoto,
    userBio,
    socialLinks,
    interests,
    spokenLangs,
    friends,
    following,
    followers,
    messages,
    starCount,
    starredUsers,
    activeRoom,
    createdRoom,
    waitingRoom
  }) {
    return new User(
      id,
      name,
      username,
      profilePhoto,
      userBio,
      socialLinks,
      interests,
      spokenLangs,
      friends,
      following,
      followers,
      messages,
      starCount,
      starredUsers,
      activeRoom,
      createdRoom,
      waitingRoom
    )
  }
}

module.exports = User
