const BaseDatabase = require("./base-database");
const User = require("./user");

class UsersDatabase extends BaseDatabase {
  findByName(name) {
    const objects = this.load(this.filename);
    return objects.find((o) => o.name == name);
  }
}

module.exports = new UsersDatabase(User);
