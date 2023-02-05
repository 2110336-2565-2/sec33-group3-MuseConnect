const mongoose = require("mongoose");
const User = require("../models/userModel");

// get musicians
const getMusicians = async (req, res) => {
  const { p, m } = req.query;
  try {
    const musicians = await User.find({ role: "MUSICIAN", ...req.body.filter })
      .sort(req.body.sort)
      .skip(p * m)
      .limit(m);
    res.status(200).json({ result: musicians });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get musician
const getMusician = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    const musician = await User.findById(id);
    if (musician.role !== "MUSICIAN") {
      throw Error("Not musician account");
    }
    res.status(200).json(musician);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMusicians,
  getMusician,
};
