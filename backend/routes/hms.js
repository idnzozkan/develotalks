const router = require('express').Router()
const HMSController = require('../controllers/hms')

router.post(
  '/token',
  HMSController.getAppToken
)

module.exports = router