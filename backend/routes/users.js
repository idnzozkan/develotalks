const router = require('express').Router()
const UsersController = require('../controllers/users')

router.get(
  '/',
  UsersController.getUsers
)

router.post(
  '/',
  UsersController.createUser
)

router.get(
  '/:username',
  UsersController.getUser
)

router.delete(
  '/:userId',
  UsersController.deleteUser
)

router.post(
  '/:ownerId/accept',
  UsersController.acceptUser
)

router.post(
  '/:ownerId/ban',
  UsersController.banUser
)

router.post(
  '/:ownerId/unban',
  UsersController.unbanUser
)

router.patch(
  '/:userId',
  UsersController.updateUser
)

router.post(
  '/:userId/follow',
  UsersController.followUser
)

router.post(
  '/:userId/unfollow',
  UsersController.unfollowUser
)

module.exports = router
