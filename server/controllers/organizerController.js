const mongoose = require("mongoose");
const User = require("../models/userModel");

// get organizers
const getOrganizers = async (req, res) => {
  const { p, m } = req.query;
  try {
    const organizers = await User.find({
      role: "ORGANIZER",
      ...req.body.filter,
    })
      .sort(req.body.sort)
      .skip(p * m)
      .limit(m);

    res.status(200).json({ result: organizers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get organizer
const getOrganizer = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }

    const organizer = await User.findById(id);
    if (organizer.role !== "ORGANIZER") {
      throw Error("Not organizer account");
    }

    res.status(200).json(organizer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOrganizers,
  getOrganizer,
};
