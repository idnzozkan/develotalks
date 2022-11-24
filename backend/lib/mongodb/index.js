const mongoose = require('mongoose')
const colors = require('colors')

const connectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost/develotalks'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log(colors.cyan.bold(`MongoDB connected: ${conn.connection.host}`))
  } catch (err) {
    console.log(colors.red.bold(`Connection Error - ${err}`))
  }
}

module.exports = { mongoose, connectDB }
