// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { isValidAadhaar } = require('./utils/validator');
const config = require('./config');
const Aadhaar = require('./models/Aadhaar');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to validate Aadhaar number format
function validateAadhaarFormat(aadhaarNumber) {
  return isValidAadhaar(aadhaarNumber);
}

// Endpoint to submit Aadhaar number for verification
app.post('/verify', async (req, res) => {
  const { aadhaarNumber } = req.body;

  // Validate Aadhaar number format
  if (!validateAadhaarFormat(aadhaarNumber)) {
    return res.status(400).json({ error: 'Invalid Aadhaar number format' });
  }

  try {
    // Check if Aadhaar number exists in the database
    const aadhaarData = await Aadhaar.findOne({ aadhaarNumber });
    if (aadhaarData) {
      res.status(200).json(aadhaarData.userData);
    } else {
      res.status(404).json({ message: 'Aadhaar number not found' });
    }
  } catch (err) {
    console.error('Error verifying Aadhaar:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to add dummy Aadhaar numbers and user data
app.post('/add', async (req, res) => {
  const { aadhaarNumber, userData } = req.body;

  try {
    const newAadhaar = new Aadhaar({ aadhaarNumber, userData });
    await newAadhaar.save();
    res.status(201).json({ message: 'Aadhaar number added successfully' });
  } catch (err) {
    console.error('Error adding Aadhaar:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
