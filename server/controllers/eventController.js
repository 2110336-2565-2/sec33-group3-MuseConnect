const mongoose = require("mongoose");
const Event = require("../models/eventModel");

const getAllEvents = async (req, res) => {
    const { p, m } = req.query;
    //console.log(req)
    try {
      const events = await Event.find()
      res.status(200).json({ result: events });
      //200 is OK, 201 is created, 400 for bad request
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const getEvent = async (req, res) => {
    //console.log(req)
    const id = req.params.id;
    try {
      if(!mongoose.isValidObjectId(id)){
        throw Error("Invalid Id");
      }
      const event = await Event.findById(id);
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const createEvent = async (req, res) => {
    //console.log(req)
    const {
      name,
      date,
      location,
      organizer,
      musician,
      detail,
      status,
      wage,
    } = req.body;
    //console.log(wage)
    try {
      const event = await Event.create({
        name,
        date,
        location,
        organizer,
        musician,
        detail,
        status,
        wage})
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

  };  
  
const updateEvent = async (req, res) => {
    //console.log(req)
    const id = req.params.id;
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw Error("Invalid Id");
      }
      delete req.body.user_id;
      const event = await Event.findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
      });
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const deleteEvent = async (req, res) => {
    //console.log(req.params.id)
    const id = req.params.id;
    try {
      if (!mongoose.isValidObjectId(id)){
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
    deleteEvent
  };