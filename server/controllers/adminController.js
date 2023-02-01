const User = require("../models/userModel");
const mongoose = require("mongoose");
// get admin
const getAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    const admin = await User.findById(id);
    if (admin.role !== "Admin") {
      throw Error("Not admin account");
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAdmin,
};
