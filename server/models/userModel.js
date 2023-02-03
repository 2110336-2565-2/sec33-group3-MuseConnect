const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "MUSICIAN", "ORGANIZER"],
    required: true,
  },
  //   portfolio: {
  //     type: mongoose.ObjectId,
  //   },
  specialization: {
    type: [String],
    default: null,
  },
  price_min: {
    type: Number,
    min: 0,
    default: null,
  },
  price_max: {
    type: Number,
    min: 0,
    default: null,
  },
  status: {
    type: String,
    enum: ["BUSY", "AVAILABLE", null],
    default: null,
  },
  location: {
    type: String,
    default: null,
  },
  preference: {
    type: String,
    default: null,
  },
  wage: {
    type: Number,
    min: 0,
    default: null,
  },
});


// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email Invalid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  // for api testing
  const user = await this.create({
    email,
    password: hash,
    first_name: "anonymous",
    last_name: "surname",
    phone_number: "000-000-0000",
    role: "Admin",
  });
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
