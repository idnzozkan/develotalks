const { usersService } = require('../../services/internal')
const socketManager = require('../../lib/socket/SocketManager')
const socket = require('../../lib/socket')

/**
 * @description Used to emit a socket event to the user's all online friends whenever the user.activeRoom changes
 * @param {*} userId ID of the current user
 */
module.exports = async userId => {
  // TODO: take the user object directly as an arg, instead of it's id
  const user = await usersService.find(userId)

  for (const friend of user.friends) {
    const onlineFriend = socketManager.findSocket(friend._id.toString())

    if (!onlineFriend) continue

    socket().to(onlineFriend.id).emit('friends:updated')
  }
}
