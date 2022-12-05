const BaseService = require('./base-service')
const { generateManagementToken } = require('../../lib/hms')

class HMSService extends BaseService {
  async createRoom(roomName) {
    const token = await generateManagementToken()
    return this.post(
      '/rooms',
      { name: roomName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

module.exports = new HMSService('https://api.100ms.live/v2')
