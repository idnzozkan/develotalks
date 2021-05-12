const fs = require("fs");
const { stringify, parse } = require("flatted");

class BaseDatabase {
  constructor(model) {
    this.model = model;
    this.filename = model.name.toLowerCase();
  }

  save(objects) {
    fs.writeFileSync(
      `./database/${this.filename}.json`,
      stringify(objects, null, 2)
    );
  }

  load() {
    const file = fs.readFileSync(`./database/${this.filename}.json`, "utf8");
    const objects = parse(file);
    return objects.map(this.model.create);
  }

  insert(object) {
    const objects = this.load(this.filename);
    this.save(this.filename, objects.concat(object));
  }

  update(object) {
    const objects = this.load(this.filename);

    const index = objects.findIndex((o) => o.id == object.id);

    if (index == -1)
      throw new Error(
        `Cannot find ${this.model.name} instance with id ${object.id}`
      );

    objects.splice(index, 1, object);
    this.save(objects);
  }

  remove(index) {
    const objects = this.load(this.filename);
    objects.splice(index, 1);
    this.save(this.filename, objects);
  }
}

module.exports = BaseDatabase;
