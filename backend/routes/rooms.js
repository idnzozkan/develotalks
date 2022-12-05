const router = require('express').Router()
const RoomsController = require('../controllers/rooms')

router.get(
  '/',
  RoomsController.getRooms
)

router.post(
  '/',
  RoomsController.createRoom
)

router.post(
  '/join',
  RoomsController.joinRoom
)

router.post(
  '/leave',
  RoomsController.leaveRoom
)

router.get(
  '/:roomId',
  RoomsController.getRoom
)

router.delete(
  '/:roomId',
  RoomsController.deleteRoom
)

router.patch(
  '/:roomId',
  RoomsController.updateRoom
)

router.get(
  '/search',
  RoomsController.searchRooms
)

module.exports = router
