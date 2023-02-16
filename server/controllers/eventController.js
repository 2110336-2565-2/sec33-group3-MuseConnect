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
    try {
      res.status(200).json({ result: req.params.id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const createEvent = async (req, res) => {
    //console.log(req)
    try {
      res.status(200).json({ result: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };  
  
const updateEvent = async (req, res) => {
    //console.log(req)
    try {
      res.status(200).json({ result: req.params.id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const deleteEvent = async (req, res) => {
    //console.log(req.params.id)
    try {
      res.status(200).json({ result: req.params.id });
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