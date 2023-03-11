const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

// get all messages from seletected chat
const allMessages = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (chat.isUserIn(req.user._id)) {
      const messages = await Message.find({ chat: req.params.chatId }).sort({ createdAt: 1 })
        .populate("content.event");
      res.status(200).json(messages);
    } else {
      res.status(400).json({ error: "This user doesn't have permission to current chat" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// send a message by getting content and chatId
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  try {
    if (!content || !chatId) {
      throw Error("Invalid data passed into request");
    }

    const chat = await Chat.findById(chatId);

    if (chat.isUserIn(req.user._id)) {
      let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
      }

      let message = await Message.create(newMessage);
      message = await  message.populate("content.event");

      await Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message
      });

      res.status(200).json(message);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  allMessages,
  sendMessage,
};