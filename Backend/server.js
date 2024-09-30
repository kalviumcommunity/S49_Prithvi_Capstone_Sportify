require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const Event = require('./models/event');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// GET route to fetch all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find(); 
    res.json(events); 
  } catch (err) {
    res.status(500).send(err.message); 
  }
});

// POST route to add a new event
app.post('/newevents', async (req, res) => {
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
