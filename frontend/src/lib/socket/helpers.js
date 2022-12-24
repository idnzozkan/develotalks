import socket from '.'

const setSocketId = id => {
  if (!id) {
    return socket.emit('leave')
  }

  socket.emit('introduce', {
    id
  })
}

export { setSocketId }
