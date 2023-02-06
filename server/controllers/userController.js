require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, first_name, last_name, phone_number, role } =
    req.body;

  try {
    const user = await User.signup(email, password, {
      first_name,
      last_name,
      phone_number,
      role,
    });

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a user
const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    const user = await User.findById(id);
    console.log(user.wage);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit a user
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    // check email
    if (typeof email !== "undefined") {
      const exists = await User.findOne({ email });
      if (exists) {
        throw Error("Email already in use");
      }
      if (!validator.isEmail(email)) {
        throw Error("Email is invalid");
      }
      console.log(`change email to ${email}`);
    }
    // check password
    if (typeof password !== "undefined") {
      if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
      }
      console.log(`change password to ${password}`);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      req.body.password = hash;
    }
    // validation update field
    const user = User.findById(id);
    // update user
    const new_user = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json(new_user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw Error("Invalid Id");
    }
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
