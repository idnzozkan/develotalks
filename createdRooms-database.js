const BaseDatabase = require("./base-database");
const Room = require("./room");

class CreatedRoomsDatabase extends BaseDatabase {
  findByOwner(ownerName) {
    return this.load().find((o) => o.owner.name == ownerName);
  }

  filterByLang(lang) {
    return this.load().filter((o) => o.roomLanguage == lang);
  }

  filterByTag(tag) {
    return this.load().filter((o) => o.roomTags.includes(tag));
  }

  filterByLangAndTag(lang, tag) {
    return this.load().filter(
      (o) => o.roomLanguage == lang && o.roomTags.includes(tag)
    );
  }
}

module.exports = new CreatedRoomsDatabase(Room);
