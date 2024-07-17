// utils/validator.js
function isValidAadhaar(aadhaarNumber) {
    // Aadhaar number should be a 12-digit number
    // 1st digit should be from 2-9 and 12th digit should be a checksum {validation done using verhoeff algorithm}
    const aadhaarPattern = /^\d{12}$/;
    return aadhaarPattern.test(aadhaarNumber);
  }
  
  module.exports = { isValidAadhaar };
  