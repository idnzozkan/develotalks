const { usersService } = require("../services/internal")

const getUsers = async (req, res) => {
  const users = await usersService.load()

  res.send(users)
}

const createUser = async (req, res, next) => {
  try {
    const user = await usersService.insert(req.body)
    res.send(user)
  } catch (e) {
    next(e)
  }
}

const getUser = async (req, res) => {
  const user = await usersService.findByUsername(req.params.username)
  if (!user) return res.status(404).send("User does not exist")

  res.send(user)
}

const deleteUser = async (req, res) => {
  await usersService.removeBy("_id", req.params.userId)

  res.send("OK")
}

const acceptUser = async (req, res) => {
  const { ownerId } = req.params
  const { userId } = req.query

  usersService.acceptWaitingUser(ownerId, userId)

  res.send("OK")
}

const banUser = async (req, res) => {
  const { ownerId } = req.params
  const { userId } = req.query

  usersService.kickOutParticipant(ownerId, userId)

  res.send("OK")
}

const unbanUser = async (req, res) => {
  const { ownerId } = req.params
  const { userId } = req.query

  usersService.removeBan(ownerId, userId)

  res.send("OK")
}

const updateUser = async (req, res) => {
  const { userId } = req.params
  const { name, profilePhoto, userBio, socialLinks, interests, spokenLangs } = req.body

  const obj = {}

  if (name) obj.name = name
  if (profilePhoto) obj.profilePhoto = profilePhoto
  if (userBio) obj.userBio = userBio
  if (socialLinks) obj.socialLinks = socialLinks
  if (interests) obj.interests = interests
  if (spokenLangs) obj.spokenLangs = spokenLangs

  await usersService.update(userId, obj)

  res.send("OK")
}

const followUser = async (req, res, next) => {
  const follower = await usersService.find(req.user._id)
  const user = await usersService.find(req.params.userId)

  try {
    await usersService.followUser(follower, user)
    res.send(user)
  } catch (err) {
    next(err)
  }
}

const unfollowUser = async (req, res, next) => {
  const follower = await usersService.find(req.user._id)
  const user = await usersService.find(req.params.userId)

  try {
    await usersService.unfollowUser(follower, user)
    res.send(user)
  } catch (err) {
    next(err)
  }
}

const getFriends = async (req, res) => {
  const friends = await usersService.query({ _id: { $in: req.user.friends } }).sort({ activeRoom: -1 })
  res.send(friends)
}

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  acceptUser,
  banUser,
  unbanUser,
  updateUser,
  followUser,
  unfollowUser,
  getFriends
}
