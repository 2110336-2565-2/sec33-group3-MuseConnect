const Chat = require("../models/chatModel");
const User = require("../models/userModel");

// fetch all chat that relate to current user
const fetchChats = async (req, res) => {
  const currentUser = await User.findById(req.user._id);

  try {
    let chat = null;
    if (currentUser.isMusician()) {
      chat = await Chat.find({ musician: currentUser }).sort({ updatedAt: -1 });
    } else {
      chat = await Chat.find({ organizer: currentUser }).sort({ updatedAt: -1 });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// access chat the chat by [current user, target user], if chat doesn't exist then create new chat
const accessChat = async (req, res) => {
  const { userId } = req.body;

  try {
    let chat = await Chat.findChatByUser(req.user._id, userId);
    if (chat) {
      console.log("Access chat");
      res.status(200).json(chat);
      return;
    }

    const user_1 = await User.findById(req.user._id);
    const user_2 = await User.findById(userId);

    if (user_2 == null) {
      throw Error("User id is not valid");
    }

    // create new chat if chat haven't already exists
    if (user_1.isMusician() && user_2.isOrganizer()) {
      chat = await Chat.create({
        organizer: user_2._id,
        musician: user_1._id,
      });
    } else if (user_1.isOrganizer() && user_2.isMusician()) {
      chat = await Chat.create({
        organizer: user_1._id,
        musician: user_2._id,
      });
    } else {
      throw Error("User role is not valid");
    }
    console.log("Create new chat");
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  fetchChats,
  accessChat,
  getChat
};
