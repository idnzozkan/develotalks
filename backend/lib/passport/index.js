const googleStrategy = require('./google-strategy')

const passport = require('passport')
const { usersService } = require('../../services')

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user._id)
  })
})

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await usersService.find(id)
    return cb(null, user)
  } catch (err) {
    return cb(err)
  }
})

module.exports = { googleStrategy }
