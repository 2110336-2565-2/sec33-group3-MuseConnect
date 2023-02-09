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

// get chat by id
chatSchema.statics.findChatByUser = async function (user_id_1, user_id_2) {
    let chat = null;
    chat = await this.findOne({
        organizer: user_id_1,
        musician: user_id_2
    });
    if(!chat) {
        chat = await this.findOne({
            organizer: user_id_2,
            musician: user_id_1
        });
    }
    return chat;
};

module.exports = mongoose.model("Chat", chatSchema);
