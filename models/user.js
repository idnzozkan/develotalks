const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2
  },
  username: {
    type: String,
    required: true
  },
  profilePhoto: String,
  userBio: {
    type: String,
    maxLength: 500
  },
  socialLinks: [String],
  interests: [String],
  spokenLangs: [String],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  messages: [{}],
  starCount: { type: Number, default: 0 },
  starredUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  activeRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    autopopulate: { maxDepth: 2 }
  },
  createdRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    autopopulate: { maxDepth: 2 }
  },
  waitingRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    autopopulate: { maxDepth: 2 }
  }
})

UserSchema.plugin(require("mongoose-autopopulate"))
module.exports = mongoose.model("User", UserSchema)
