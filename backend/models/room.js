const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 }
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: this.owner,
        autopopulate: { maxDepth: 1 }
      }
    ],
    title: {
      type: String,
      maxLength: 100
    },
    description: {
      type: String,
      maxLength: 200
    },
    roomLanguage: String,
    kickedPeople: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { maxDepth: 1 }
      }
    ],
    waitingPeople: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { maxDepth: 1 }
      }
    ],
    maxParticipants: Number,
    canUseMic: Boolean,
    canUseWebcam: Boolean,
    canShareScreen: Boolean,
    canTypeToChatBox: Boolean,
    isPrivate: Boolean,
    roomTags: [String],
    hmsId: String
  },
  {
    timestamps: true
  }
)

RoomSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Room', RoomSchema)
