const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
    unique: true
  },
  eventName: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  participants: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
