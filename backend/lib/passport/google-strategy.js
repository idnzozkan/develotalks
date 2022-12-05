const GoogleStrategy = require('passport-google-oauth20')
const { usersService } = require('../../services/internal')

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_BASE_PATH}/oauth/google/callback`,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    scope: ['email', 'profile'],
  },
  async function (accessToken, refreshToken, profile, cb) {
    const user = await usersService.findOrCreateByProvider('google', profile)
    cb(null, user)
  }
)

module.exports = googleStrategy
