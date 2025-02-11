require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const Event = require('./models/event');

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/events', async (req, res) => {
  try {
    const events = await Event.find(); 
    res.json(events); 
  } catch (err) {
    res.status(500).send(err.message); 
  }
});

app.post('/newevents', async (req, res) => {
  try {
    const { eventId, eventName, eventDate, location, participants, description } = req.body;

    if (!eventId || !eventName || !eventDate || !location || !participants) {
      return res.status(400).json({ message: 'All fields except description are required.' });
    }

    const event = new Event({
      eventId,
      eventName,
      eventDate,
      location,
      participants,
      description
    });

    await event.save();
    res.status(201).json(event);  

  } catch (error) {
    res.status(500).json({ message: error.message });  
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
