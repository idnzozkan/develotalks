const BaseDatabase = require("./base-database")
const User = require("../models/user")

class UsersDatabase extends BaseDatabase {
  async findByName(name) {
    const objects = await this.load()
    return objects.find(o => o.name == name)
  }
}

module.exports = new UsersDatabase(User)
