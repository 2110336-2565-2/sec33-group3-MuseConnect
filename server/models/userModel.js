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
    require: true,
  },
  phone_number: {
    type: String,
    require: true,
  },
  portfolio: {
    type: Schema.Types.ObjectId,
  },
  specialization: {
    type: [String],
  },
  price_min:{
    type: Number,
    min : 0
  },
  price_max:{
    type: Number,
    min : 0
  },
  status:{
    type: String,
    enum : ['BUSY','AVAILABLE']
  },
  location:{
    type: String
  },
  preference:{
    type: String
  },
  wage:{
    type: Number,
    min : 0
  }
});

const portfolio_schema = mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'userSchema',
        require : true
    },
    profile_picture:{
        data: Buffer,
        contentType: String
    },
    link:{
        type:String
    }
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
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email Invalid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

    // validation
    if (!email) {
        throw Error('Email must be filled')
    }
    if (!password) {
        throw Error('Password must be filled')
    }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
