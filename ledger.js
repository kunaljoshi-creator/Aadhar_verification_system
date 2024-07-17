const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

let ledger = [];

app.use(bodyParser.json());

app.post('/add', (req, res) => {
  const { encryptedAadhaar } = req.body;
  ledger.push(encryptedAadhaar);
  res.status(200).json({ message: 'Aadhaar number added to ledger' });
});

app.get('/check/:encryptedAadhaar', (req, res) => {
  const { encryptedAadhaar } = req.params;
  const verified = ledger.includes(encryptedAadhaar);
  res.status(200).json({ verified });
});

// Start ledger server
app.listen(PORT, () => {
  console.log(`Ledger server is running on http://localhost:${PORT}`);
});
