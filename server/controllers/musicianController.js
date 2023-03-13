const mongoose = require("mongoose");
const User = require("../models/userModel");

// get musicians
const getMusicians = async (req, res) => {
  const { p, m, name, preference } = req.query;
  const regex = new RegExp(`${name}`, "i");
  try {
    const musicians = await User.find({
      role: "MUSICIAN",
      // status:"AVAILABLE",
      $or: [
        { first_name: { $regex: regex } },
        { last_name: { $regex: regex } },
      ],
      specialization: { $in: preference.split(",") },
    })
      .skip(p * m)
      .limit(m);
    res.status(200).json({ result: musicians });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a musician
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
