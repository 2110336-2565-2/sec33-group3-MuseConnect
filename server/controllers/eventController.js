const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const getAllEvents = async (req, res) => {
  const { p, m } = req.query;
  try {
    const events = await Event.find();

    res.status(200).json({ result: events });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEvent = async (req, res) => {
  const id = req.params.id;
  console.log(req);
  //user_id is id of user who call this function
  const user_id = req.body.user_id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    // Check id
    if (!mongoose.isValidObjectId(user_id)) {
      throw Error("Invalid user_id");
    }
    const event = await Event.findById(id);
    if (
      String(event.organizer) != user_id &&
      String(event.musician) != user_id
    ) {
      throw Error("Authentication failed");
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createEvent = async (req, res) => {
  const { name, date, location, organizer, musician, detail, status, wage } =
    req.body;
  try {
    const event = await Event.create({
      name,
      date,
      location,
      organizer,
      musician,
      detail,
      status,
      wage,
      transaction_state
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }

    const message = await Message.findById(id);
    if (typeof message.content !== "object") {
      throw Error("Message is not event");
    }

    const event = await Event.findByIdAndUpdate(
      message.content.event,
      req.body,
      {
        returnDocument: "after",
      }
    );
    // console.log(event);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    const event = await Event.findByIdAndDelete(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
