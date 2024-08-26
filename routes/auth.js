const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Customer = require('../models/customer');
require('dotenv').config();

router.post('/login', async (req, res) => {
  const { Email,Password } = req.body;

  try {
    const customer = await Customer.findOne({ where: { Email: Email } });

    if (!customer) {
      return res.status(404).json({ message: 'Kullanici bulunamadi' });
    }

    if (Password !== customer.Password) {
      return res.status(401).json({ message: 'Geçersiz şifre' });
    }

    const token = jwt.sign(
      { 
        CustomerID: customer.CustomerID,
        LicenseID: customer.LicenseID
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
