const router = require('express').Router()
const passport = require('passport')
const OauthController = require('../controllers/oauth')

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google'),
  OauthController.googleCallback
)

router.get(
  '/logout',
  OauthController.logout
)

router.get(
  '/me',
  OauthController.getMe
)

module.exports = router;