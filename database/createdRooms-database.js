const BaseDatabase = require("./base-database")
const Room = require("../models/room")

class CreatedRoomsDatabase extends BaseDatabase {
  async findByOwner(ownerName) {
    return (await this.load()).find(o => o.owner.name == ownerName)
  }

  async filterByLang(lang) {
    return (await this.load()).filter(o => o.roomLanguage == lang)
  }

  async filterByTag(tag) {
    return (await this.load()).filter(o => o.roomTags.includes(tag))
  }

  async filterByLangAndTag(lang, tag) {
    return (await this.load()).filter(o => o.roomLanguage == lang && o.roomTags.includes(tag))
  }
}

module.exports = new CreatedRoomsDatabase(Room)
