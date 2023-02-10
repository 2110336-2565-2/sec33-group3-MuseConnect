const mongoose = require("mongoose");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const allMessages = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    let message = null;
    if (currentUser.isMusician()) {
      message = await User.find({ musician: currentUser._id });
    } else {
      message = await User.find({ organizer: currentUser._id });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  try {
    if (!content || !chatId) {
      throw Error("Invalid data passed into request");
    }
    let newMessage = {
      sender: req.user._id,
      content: {
        text: content
      },
      chat: chatId
    }

    const message = await Message.create(newMessage);

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  allMessages,
  sendMessage,
};