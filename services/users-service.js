const BaseService = require("./base-service")
const User = require("../models/user")
const createdRoomsService = require("./createdRooms-service")
const colors = require("colors")

class UsersService extends BaseService {
  async findByName(name) {
    return this.findBy("name", name)
  }

  async stopSession(user) {
    if (user.activeRoom) {
      user.activeRoom.participants = user.activeRoom.participants.filter(
        p => p._id.toString() != user._id.toString()
      )
      await user.activeRoom.save()

      user.activeRoom = null
      await user.save()

      console.log(colors.magenta(`${user.name} left`))
    }

    if (user.waitingRoom) {
      user.waitingRoom.waitingPeople = user.waitingRoom.waitingPeople.filter(
        u => u._id.toString() !== user._id.toString()
      )
      await user.waitingRoom.save()

      user.waitingRoom = null
      await user.save()

      console.log(colors.magenta(`${user.name} left from the waiting room`))
    }
  }

  async createRoom(
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
  ) {
    const owner = await this.find(userId)

    if (owner.activeRoom || owner.waitingRoom) {
      await this.stopSession(owner)
    }

    const room = await createdRoomsService.insert({
      owner,
      participants: [owner],
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

    owner.activeRoom = room
    owner.createdRoom = room

    await owner.save()

    return room
  }

  async joinRoom(userId, roomId) {
    const user = await this.find(userId)
    const room = await createdRoomsService.find(roomId)

    if (room.maxParticipants <= room.participants.length) {
      throw new Error("Room is full")
    } else if (
      room.kickedPeople.some(bannedUser => bannedUser._id.toString() == user._id.toString())
    ) {
      throw new Error("You have been banned from this room before")
    } else if (
      room.participants.some(participant => participant._id.toString() == user._id.toString()) ||
      user.activeRoom?._id.toString() == room._id.toString()
    ) {
      throw new Error("You are already in this room")
    }

    if (user.activeRoom || user.waitingRoom) await this.stopSession(user)

    if (room.isPrivate && user._id.toString() !== room.owner._id.toString()) {
      console.log(
        colors.bold.yellow(
          "This is a private room. You need to wait for you to be taken into the room by the owner."
        )
      )

      room.waitingPeople.push(user)
      user.waitingRoom = room
    } else {
      user.activeRoom = room
      room.participants.push(user)

      console.log(colors.green(`${user.name} joined ${room.owner.name}'s room`))
    }

    await user.save()
    await room.save()
  }

  async kickOutParticipant(ownerId, userId) {
    const owner = await this.find(ownerId)
    const user = await this.find(userId)

    if (owner._id.toString() != owner.activeRoom?.owner._id.toString()) {
      console.log(colors.red("You do not have permission to do this"))
    } else if (
      owner._id.toString() == owner.activeRoom.owner._id.toString() &&
      user._id.toString() == owner._id.toString()
    ) {
      console.log(colors.red("You cannot kick yourself. Try to disconnect."))
    } else {
      user.activeRoom = null
      owner.createdRoom.participants = owner.createdRoom.participants.filter(
        p => p._id.toString() != user._id.toString()
      )
      owner.createdRoom.kickedPeople.push(user)

      console.log(
        colors.red(`${colors.bold(`${user.name}`)} kicked by ${colors.bold(`${owner.name}`)}`)
      )
    }

    await user.save()
    await owner.createdRoom.save()
  }

  async removeBan(ownerId, userId) {
    const owner = await this.find(ownerId)
    const user = await this.find(userId)

    if (owner.createdRoom?._id.toString() != owner.activeRoom?._id.toString()) {
      console.log(colors.red("You do not have permission to do this"))
    } else {
      owner.createdRoom.kickedPeople = owner.createdRoom.kickedPeople.filter(
        bannedUser => bannedUser._id.toString() != user._id.toString()
      )
      console.log(colors.yellow(`${owner.name} removed ${user.name}'s ban`))
    }

    await owner.createdRoom.save()
  }

  async acceptWaitingUser(ownerId, userId) {
    const owner = await this.find(ownerId)
    const user = await this.find(userId)

    if (owner._id.toString() == user.activeRoom?.owner._id.toString()) {
      if (user && user.waitingRoom._id.toString() == owner.createdRoom._id.toString()) {
        owner.createdRoom.waitingPeople = owner.createdRoom.waitingPeople.filter(
          waitingUser => waitingUser._id.toString() != user._id.toString()
        )
        user.waitingRoom = null
        owner.createdRoom.participants.push(user)
        user.activeRoom = owner.createdRoom
        console.log(colors.cyan(`${owner.name} accepted ${user.name}'s joining request`))
      }
    } else {
      console.log("Only room owner can do this action!")
    }

    await user.save()
    await owner.createdRoom.save()
  }
}

module.exports = new UsersService(User)
