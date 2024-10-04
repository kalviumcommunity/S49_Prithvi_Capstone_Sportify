const express = require('express');
const router = express.Router();
const Event = require('./models/event');

// Middleware
router.use(express.json());
router.use(require('cors')());

// GET route to fetch all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events); 
  } catch (err) {
    // Handle specific database errors
    if (err.name === 'MongoNetworkError') {
      return res.status(503).json({ message: 'Service Unavailable: Cannot connect to the database.' });
    } else if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid data format.' });
    }
    res.status(500).json({ message: 'Internal Server Error: ' + err.message });
  }
});

// POST route to add a new event
router.post('/newevents', async (req, res) => {
  try {
    const { eventId, eventName, eventDate, location, participants, description } = req.body;

    // Input validation
    if (!eventId || !eventName || !eventDate || !location || !participants) {
      return res.status(400).json({ message: 'All fields except description are required.' });
    }

    // Additional validation for eventDate (example for future date)
    const eventDateObj = new Date(eventDate);
    if (isNaN(eventDateObj.getTime()) || eventDateObj < new Date()) {
      return res.status(400).json({ message: 'Invalid or past event date.' });
    }

    // Create new event instance
    const event = new Event({
      eventId,
      eventName,
      eventDate: eventDateObj,
      location,
      participants,
      description
    });

    // Save the event to the database
    await event.save();
    res.status(201).json(event);  // Send back the created event

  } catch (error) {
    // Handle validation errors from MongoDB
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error: ' + error.message });
    }

    // Handle duplicate key error (e.g., unique eventId)
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Conflict: Event with this ID already exists.' });
    }

    // General error handling for unexpected errors
    res.status(500).json({ message: 'Internal Server Error: ' + error.message });
  }
});

module.exports = router;
