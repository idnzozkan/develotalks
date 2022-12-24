const { Server } = require('socket.io')
const socketManager = require('./SocketManager')

let io = null

module.exports = server => {
  if (io) return io

  io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', async socket => {
    socket.on('disconnect', () => {
      if (!socket.data.id) {
        return
      }

      socketManager.removeSocket(socket.data.id)
    })

    socket.on('introduce', ({ id }) => {
      socket.data.id = id
      socketManager.addSocket(socket)
    })

    socket.on('leave', () => {
      socketManager.removeSocket(socket.data.id)
    })
  })

  return io
}
