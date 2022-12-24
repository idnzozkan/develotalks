class SocketManager {
  constructor() {
    this.sockets = {}
  }

  addSocket(socket) {
    const existingSocket = this.sockets[socket.data.id]

    if (existingSocket) {
      return
    }

    this.sockets[socket.data.id] = socket
  }

  removeSocket(id) {
    delete this.sockets[id]
  }

  findSocket(id) {
    return this.sockets[id]
  }
}

module.exports = new SocketManager()
