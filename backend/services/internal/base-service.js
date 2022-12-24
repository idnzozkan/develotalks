class BaseService {
  constructor(model) {
    this.model = model
  }

  save(objects) {
    return this.model.insertMany(objects)
  }

  load() {
    return this.model.find()
  }

  async insert(object) {
    return await this.model.create(object)
  }

  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object)
  }

  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value })
  }

  query(obj) {
    return this.model.find(obj)
  }

  async find(id) {
    return this.model.findById(id)
  }

  async findBy(property, value) {
    return this.model.find({ [property]: value })
  }

  async findOneBy(property, value) {
    return this.model.findOne({ [property]: value })
  }
}

module.exports = BaseService
