const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

// TODO update res
// get all messages from seletected chat
const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({chat: req.params.chatId})
    // .populate("sender")
    // .populate("chat")
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// TODO make it can send other type of content
// send a message by getting content and chatId
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

// TODO update send event
// const sendEventMessage = async (req, res) => {
//   const { content, chatId } = req.body;

//   try {
//     if (!content || !chatId) {
//       throw Error("Invalid data passed into request");
//     }
//     let newMessage = {
//       sender: req.user._id,
//       content: {
//         text: content
//       },
//       chat: chatId
//     }

//     const message = await Message.create(newMessage);

//     await Chat.findByIdAndUpdate(req.body.chatId, {
//       latestMessage: message
//     });

//     res.status(200).json(message);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };



module.exports = {
  allMessages,
  sendMessage,
};