const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      text: {
        type: String,
        trim: true,
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("Message", messageSchema);
