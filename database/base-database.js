const fs = require("fs")
const { stringify, parse } = require("flatted")

class BaseDatabase {
  constructor(model) {
    this.model = model
    this.filename = model.name.toLowerCase()
  }

  save(objects) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`./database/${this.filename}.json`, stringify(objects, null, 2), err => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  load() {
    return new Promise((resolve, reject) => {
      fs.readFile(`./database/${this.filename}.json`, "utf8", (err, file) => {
        if (err) return reject(err)
        const objects = parse(file)
        resolve(objects.map(this.model.create))
      })
    })
  }

  async insert(object) {
    const objects = await this.load()
    return this.save(objects.concat(object))
  }

  async update(object) {
    const objects = await this.load()

    const index = objects.findIndex(o => o.id == object.id)

    if (index == -1) throw new Error(`Cannot find ${this.model.name} instance with id ${object.id}`)

    objects.splice(index, 1, object)
    return this.save(objects)
  }

  async remove(index) {
    const objects = await this.load()
    objects.splice(index, 1)
    return this.save(objects)
  }

  async find(id) {
    const objects = await this.load()
    return objects.find(o => o.id == id)
  }
}

module.exports = BaseDatabase
