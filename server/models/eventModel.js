const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: mongoose.ObjectId,
    ref: "userSchema",
    require: true,
  },
  musician: {
    type: mongoose.ObjectId,
    ref: "userSchema",
    require: true,
  },
  detail: {
    type: String,
  },
  status: {
    type: String,
    enum: ["ACCEPT", "DECLINE", "PENDING", "CANCELLED"],
    default: "PENDING",
  },
  wage: {
    type: Number,
    min: 0,
  },
});

module.exports = mongoose.model("Event", eventSchema);
