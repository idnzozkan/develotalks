const jwt = require('jsonwebtoken')
const uuid4 = require('uuid4')

const app_access_key = process.env.HMS_APP_ACCESS_KEY
const app_secret = process.env.HMS_APP_SECRET

/**
 * @param {string} roomId
 * @param {string} userId
 * @param {string} role
 * @description The app token is used to joining a room and other room actions on the client side.
 * Reference: https://www.100ms.live/docs/server-side/v2/introduction/authentication-and-tokens#app-token
 */
const generateAppToken = (roomId, userId, role) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        access_key: app_access_key,
        room_id: roomId,
        user_id: userId,
        role: role,
        type: 'app',
        version: 2,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000)
      },
      app_secret,
      {
        algorithm: 'HS256',
        expiresIn: '24h',
        jwtid: uuid4()
      },
      function (err, token) {
        if (err) {
          reject(err)
        }

        resolve(token)
      }
    )
  })
}

/**
 * @description The management token is used to create a room on 100ms.
 * Reference: https://www.100ms.live/docs/server-side/v2/introduction/authentication-and-tokens#management-token
 */
const generateManagementToken = () => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        access_key: app_access_key,
        type: 'management',
        version: 2,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000)
      },
      app_secret,
      {
        algorithm: 'HS256',
        expiresIn: '24h',
        jwtid: uuid4()
      },
      function (err, token) {
        if (err) {
          reject(err)
        }
        resolve(token)
      }
    )
  })
}

module.exports = {
  generateAppToken,
  generateManagementToken
}
