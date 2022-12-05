const axios = require('axios')

class BaseService {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async get(path) {
    const { data } = await axios.get(this.baseURL + path)
    return data
  }

  async post(path, payload, config) {
    const { data } = await axios.post(this.baseURL + path, payload, config)
    return data
  }

  async put(path, payload) {
    const { data } = await axios.put(this.baseURL + path, payload)
    return data
  }

  async patch(path, payload) {
    const { data } = await axios.patch(this.baseURL + path, payload)
    return data
  }

  async delete(path) {
    const { data } = await axios.delete(this.baseURL + path)
    return data
  }
}

module.exports = BaseService
