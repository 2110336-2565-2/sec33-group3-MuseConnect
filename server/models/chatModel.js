const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    musician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    latestMessageEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

// retrieve a chat based on the unique identifiers of two users
// use the user_id_1 and user_id_2 values to retrieve the chat between the two users
chatSchema.statics.findChatByUser = async function (user_id_1, user_id_2) {
  let chat = null;
  chat = await this.findOne({
    organizer: user_id_1,
    musician: user_id_2,
  });
  if (!chat) {
    chat = await this.findOne({
      organizer: user_id_2,
      musician: user_id_1,
    });
  }
  return chat;
};

chatSchema.methods.isUserIn = function (userId) {
  return this.musician.equals(userId) || this.organizer.equals(userId);
};

module.exports = mongoose.model("Chat", chatSchema);
