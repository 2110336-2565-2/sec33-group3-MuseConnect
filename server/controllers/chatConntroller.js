const mongoose = require("mongoose");
const Chat = require("../models/chatModel");

// get chat
const getChat = async (req, res) => {
  const {
    organizer,
    musician
  } = req.body;
  try {
    const chat = await Chat.findOne({
      organizer: organizer,
      musician: musician
    });
    
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create chat
const createChat = async (req, res) => {
  const {
    organizer,
    musician
  } = req.body;

  try {
    const exists = await Chat.findOne({
      organizer: organizer,
      musician: musician
    });

    if (exists) {
      throw Error("Chatroom already in use");
    }
    
    const chat = await Chat.create({
      organizer,
      musician
    })

    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getChat,
  createChat,
};
