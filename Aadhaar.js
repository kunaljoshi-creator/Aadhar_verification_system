// models/Aadhaar.js
const mongoose = require('mongoose');

const aadhaarSchema = new mongoose.Schema({
  aadhaarNumber: { type: String, required: true, unique: true },
  userData: {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    Contact : { type: String, required: true },
    email : { type: String, required: true },
    gender : { type: String, required: true },
    Court_cases : { type: String, required: true },
    Number_of_bank_linked: { type: String, required: true },
    photo : { type: String, required: true },


  },
});

const Aadhaar = mongoose.model('Aadhaar', aadhaarSchema);

module.exports = Aadhaar;
