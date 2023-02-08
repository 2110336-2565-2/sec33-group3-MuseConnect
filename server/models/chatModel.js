const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    musician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    // [Optional] display of the most recent message before entering the chat room
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
}, {
    timeStamps: true,
});

module.exports = mongoose.model("Chat", chatSchema);
