const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/develotalks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  console.log("we're connected!")
})
