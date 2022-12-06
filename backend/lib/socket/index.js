const { Server } = require('socket.io')

let io = null

module.exports = server => {
  if (io) return io

  io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', async socket => {
    console.log('a user connected with the socket:', socket.id)
  })

  return io
}
