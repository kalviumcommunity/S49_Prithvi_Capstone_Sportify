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
    res.status(500).send(err.message); 
  }
});

// POST route to add a new event
router.post('/newevents', async (req, res) => {
  try {
    const { eventId, eventName, eventDate, location, participants, description } = req.body;

    // Validate request body
    if (!eventId || !eventName || !eventDate || !location || !participants) {
      return res.status(400).json({ message: 'All fields except description are required.' });
    }

    // Create new event instance
    const event = new Event({
      eventId,
      eventName,
      eventDate,
      location,
      participants,
      description
    });

    // Save the event to the database
    await event.save();
    res.status(201).json(event);  // Send back the created event

  } catch (error) {
    res.status(500).json({ message: error.message });  // Send error if any occurs
  }
});

module.exports = router;
