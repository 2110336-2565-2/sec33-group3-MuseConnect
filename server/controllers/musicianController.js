const mongoose = require("mongoose");
const User = require("../models/userModel");

// get musicians
const getMusicians = async (req, res) => {
  let { p, m, name, specialization } = req.query;
  const value = { role: "MUSICIAN" };
  console.log(name);
  console.log(specialization);
  const regex = new RegExp(`${name}`, "i");

  if (name !== undefined) {
    value["$or"] = [
      { first_name: { $regex: regex } },
      { last_name: { $regex: regex } },
    ];
  }
  if (specialization !== undefined) {
    value["specialization"] = { $in: specialization.split(",") };
  }

  // console.log(regex) ;
  try {
    const musicians = await User.find(value)
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
