const BaseService = require('./base-service')
const User = require('../../models/user')
const roomsService = require('./rooms-service')
const colors = require('colors')

class UsersService extends BaseService {
  async findOrCreateByProvider(provider, profile) {
    switch (provider) {
      case 'google':
        let user = await this.findOneBy('googleId', profile.id)

        if (user) return user

        user = await this.insert({
          googleId: profile.id,
          name: profile._json.name,
          username: profile._json.email.split('@')[0],
          email: profile._json.email,
          avatar: profile._json.picture.split('=')[0],
        })

        return user
      default:
        return
    }
  }

  async findByUsername(username) {
    return this.findOneBy('username', username)
  }

  async stopSession(user) {
    if (user.activeRoom) {
      user.activeRoom.participants = user.activeRoom.participants.filter(p => !p._id.equals(user._id))
      await user.activeRoom.save()

      user.activeRoom = null
      await user.save()

      console.log(colors.magenta(`${user.name} left`))
    }

    if (user.waitingRoom) {
      user.waitingRoom.waitingPeople = user.waitingRoom.waitingPeople.filter(u => !u._id.equals(user._id))
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

    const room = await roomsService.insert({
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
    })

    owner.activeRoom = room
    owner.createdRoom = room

    await owner.save()

    return room
  }

  async joinRoom(userId, roomId) {
    const user = await this.find(userId)
    const room = await roomsService.find(roomId)

    if (room.maxParticipants <= room.participants.length) {
      throw new Error('Room is full')
    }

    if (room.kickedPeople.some(bannedUser => bannedUser._id.equals(user._id))) {
      throw new Error('You have been banned from this room before')
    }

    if (room.participants.some(participant => participant._id.equals(user._id))) {
      throw new Error('You are already in this room')
    }

    if (user.activeRoom || user.waitingRoom) await this.stopSession(user)

    if (room.isPrivate && !user._id.equals(room.owner._id)) {
      console.log(
        colors.bold.yellow('This is a private room. You need to wait for you to be taken into the room by the owner.')
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

    if (owner.createdRoom && user.activeRoom) {
      if (
        !owner._id.equals(user.activeRoom.owner._id) &&
        user.activeRoom.participants.some(p => !p._id.equals(owner._id))
      ) {
        console.log(colors.red('You do not have permission to do this'))
      } else if (user._id.equals(owner._id)) {
        console.log(colors.red('You cannot kick yourself. Try to disconnect.'))
      } else {
        user.activeRoom = null
        owner.createdRoom.participants = owner.createdRoom.participants.filter(p => !p._id.equals(user._id))
        owner.createdRoom.kickedPeople.push(user)

        console.log(colors.red(`${colors.bold(`${user.name}`)} kicked by ${colors.bold(`${owner.name}`)}`))
      }

      await user.save()
      await owner.createdRoom.save()
    }
  }

  async removeBan(ownerId, userId) {
    const owner = await this.find(ownerId)
    const user = await this.find(userId)

    if (owner.createdRoom && owner.activeRoom) {
      if (
        !owner.createdRoom._id.equals(owner.activeRoom._id) &&
        owner.activeRoom.kickedPeople.some(u => !u._id.equals(user._id))
      ) {
        console.log(colors.red('You do not have permission to do this'))
      } else {
        owner.createdRoom.kickedPeople = owner.createdRoom.kickedPeople.filter(
          bannedUser => !bannedUser._id.equals(user._id)
        )
        console.log(colors.yellow(`${owner.name} removed ${user.name}'s ban`))
      }

      await owner.createdRoom.save()
    }
  }

  async acceptWaitingUser(ownerId, userId) {
    const owner = await this.find(ownerId)
    const user = await this.find(userId)

    if (owner.createdRoom && owner.activeRoom && user.waitingRoom) {
      if (owner._id.equals(user.waitingRoom.owner._id) && owner.activeRoom._id.equals(user.waitingRoom?._id)) {
        owner.createdRoom.waitingPeople = owner.createdRoom.waitingPeople.filter(
          waitingUser => !waitingUser._id.equals(user._id)
        )
        user.waitingRoom = null
        owner.createdRoom.participants.push(user)
        user.activeRoom = owner.createdRoom
        console.log(colors.cyan(`${owner.name} accepted ${user.name}'s joining request`))
      } else {
        console.log('Only room owner can do this action!')
      }

      await user.save()
      await owner.createdRoom.save()
    }
  }

  async followUser(follower, user) {
    if (user._id.equals(follower._id)) {
      throw new Error('You cannot follow yourself')
    }

    if (user.followers.some(u => u._id.equals(follower._id)) || follower.following.some(u => u._id.equals(user._id))) {
      throw new Error('You are already following this user')
    }

    follower.following.push(user)
    user.followers.push(follower)

    if (follower.followers.some(u => u._id.equals(user._id))) {
      follower.friends.push(user)
      user.friends.push(follower)
    }

    await follower.save()
    await user.save()
  }

  async unfollowUser(follower, user) {
    if (user._id.equals(follower._id)) {
      throw new Error('You cannot unfollow yourself')
    }

    if (!user.followers.some(u => u._id.equals(follower._id)) || !follower.following.some(u => u._id.equals(user._id))) {
      throw new Error('You are not following this user')
    }

    follower.following = follower.following.filter(u => !u._id.equals(user._id))
    user.followers = user.followers.filter(u => !u._id.equals(follower._id))

    if (follower.friends.some(u => u._id.equals(user._id))) {
      follower.friends = follower.friends.filter(u => !u._id.equals(user._id))
      user.friends = user.friends.filter(u => !u._id.equals(follower._id))
    }

    await follower.save()
    await user.save()
  }
}

module.exports = new UsersService(User)
