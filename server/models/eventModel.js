const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
      event_id:{
        type:String,
        required:true,
        unique:true
      },
      date:{
        type:Date,
        required:true
      },
      location:{
        type:String,
        required:true
      },
      //may adjust organizer and musician to Object
      organizer:{
        type:String,
        required:true
      },
      musician:{
        type:String,
        required:true
      },
      detail:{
        type:String
      },
      status:{
        type:String,
        enum: ["ACCEPT", "DECLINE", "WAITING"],
        default:"WAITING"
      },
      wage: {
        type: Number,
        min: 0,
      }

})

module.exports = mongoose.model('Event', eventSchema)