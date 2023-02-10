const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

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
  specialization: {
    type: [String],
  },
  price_min: {
    type: Number,
    min: 0,
  },
  price_max: {
    type: Number,
    min: 0,
  },
  status: {
    type: String,
    enum: ["BUSY", "AVAILABLE"],
  },
  location: {
    type: String,
  },
  preference: {
    type: String,
  },
  wage: {
    type: Number,
    min: 0,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password, profile) {
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
    ...profile,
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

// get JwtToken
userSchema.methods.getSignedJwtToken=function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

userSchema.methods.isOrganizer=function() {
  return this.role == "ORGANIZER";
}

userSchema.methods.isMusician=function() {
  return this.role == "MUSICIAN";
}


module.exports = mongoose.model("User", userSchema);
