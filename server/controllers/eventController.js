const mongoose = require("mongoose");
const Event = require("../models/eventModel");

const getEvents = async (req, res) => {
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
  