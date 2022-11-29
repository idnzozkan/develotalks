const BaseService = require('./base-service')
const Room = require('../models/room')

class RoomsService extends BaseService {
  async findByOwnerId(ownerId) {
    return this.findBy('owner', ownerId)
  }

  async findByLang(lang) {
    return this.findBy('roomLanguage', lang)
  }

  async findByTag(tag) {
    return this.findBy('roomTags', tag)
  }

  async filterByLangAndTag(lang, tag) {
    return (await this.load()).filter(o => o.roomLanguage == lang && o.roomTags.includes(tag))
  }
}

module.exports = new RoomsService(Room)
