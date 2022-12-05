const { generateAppToken } = require('../lib/hms')

const getAppToken = async (req, res) => {
  const { roomId, userId, role } = req.body
  const token = await generateAppToken(roomId, userId, role)

  res.send(token)
}

module.exports = {
  getAppToken
}
