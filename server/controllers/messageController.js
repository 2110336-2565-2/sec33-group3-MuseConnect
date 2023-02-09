const mongoose = require("mongoose");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const allMessages = async (req, res) => {
  // const currentUser = await User.findById(req.user._id);

  try {
    
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
  const {content, chatId} = req.body;

  try {
    if(!content || !chatId) {
      throw Error("Invalid data passed into request");
    }
    let newMessage = {
      sender: req.user._id,
      content: {
        text: req.content
      },
      chat: chatId
    }

    console.log(newMessage)
    let message = await Message.create(newMessage);

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  allMessages,
  sendMessage,
};